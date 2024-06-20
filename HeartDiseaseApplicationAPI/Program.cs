using HeartDisease.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using HeartDisease.Infrastructure.Models;
using HeartDisease.Application.Dtos;
using System.Text.Json.Serialization;
using HeartDisease.Application.Services;

var builder = WebApplication.CreateBuilder(args);

// Ensure the configuration is being read correctly
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrEmpty(jwtKey) || jwtKey.Length < 32 || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
{
    throw new ArgumentNullException("JWT configuration values are missing or invalid.");
}

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("HeartDiseaseDB")));

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://127.0.0.1:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Heart Disease API", Version = "v1" });
    c.MapType<DateOnly>(() => new OpenApiSchema { Type = "string", Format = "date" });
});

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await RoleInitializer.Initialize(services);
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Heart Disease API v1");
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Minimal APIs

#region UserApi's

app.MapPost("/users/register", async (RegisterUserDto userDto, UserManager<User> userManager) =>
{
    var user = new User
    {
        UserName = userDto.Username,
        Email = userDto.Email,
        DateCreated = DateTime.UtcNow,
        DateModified = DateTime.UtcNow
    };

    var result = await userManager.CreateAsync(user, userDto.Password);

    if (!result.Succeeded)
    {
        return Results.BadRequest(result.Errors);
    }

    return Results.Created($"/users/{user.Id}", user);
}).WithName("RegisterUser").WithTags("Users").AllowAnonymous();

app.MapPost("/users/login", async (LoginUserDto userDto, UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration) =>
{
    var user = await userManager.FindByEmailAsync(userDto.Email);

    if (user == null)
    {
        return Results.Unauthorized();
    }

    var result = await signInManager.PasswordSignInAsync(user.UserName, userDto.Password, false, false);

    if (!result.Succeeded)
    {
        return Results.Unauthorized();
    }

    var roles = await userManager.GetRolesAsync(user);
    var token = JwtTokenGenerator.GenerateJwtToken(user, roles, configuration);

    return Results.Ok(new { token });
}).WithName("LoginUser").WithTags("Users").AllowAnonymous();

app.MapDelete("/users/{id}", async (string id, UserManager<User> userManager) =>
{
    var user = await userManager.FindByIdAsync(id);

    if (user == null)
    {
        return Results.NotFound();
    }

    var result = await userManager.DeleteAsync(user);

    if (!result.Succeeded)
    {
        return Results.BadRequest(result.Errors);
    }

    return Results.Ok(user);
}).WithName("DeleteUser").WithTags("Users");

#endregion

#region PatientApi's

app.MapGet("/patients/{id}", async (string id, ApplicationDbContext db) =>
{
    var patient = await db.Patients.FindAsync(id);

    if (patient == null)
    {
        return Results.NotFound();
    }

    var patientDto = new PatientDto
    {
        Id = patient.Id,
        Name = patient.Name,
        DateOfBirth = patient.DateOfBirth
    };

    return Results.Ok(patientDto);
})
.WithName("GetPatientById")
.WithTags("Patients")
.RequireAuthorization();

app.MapPost("/patients", async (Patient patient, ApplicationDbContext db) =>
{
    db.Patients.Add(patient);
    await db.SaveChangesAsync();
    return Results.Created($"/patients/{patient.Id}", patient);
})
.WithName("CreatePatient")
.WithTags("Patients")
.RequireAuthorization();

app.MapPut("/patients/{id}", async (string id, Patient inputPatient, ApplicationDbContext db) =>
{
    var patient = await db.Patients.FindAsync(id);

    if (patient == null) return Results.NotFound();

    patient.Name = inputPatient.Name;
    patient.DateOfBirth = inputPatient.DateOfBirth;
    // Update other properties as needed

    await db.SaveChangesAsync();

    return Results.NoContent();
})
.WithName("UpdatePatient")
.WithTags("Patients")
.RequireAuthorization();

app.MapDelete("/patients/{id}", async (string id, ApplicationDbContext db) =>
{
    var patient = await db.Patients.FindAsync(id);
    if (patient == null) return Results.NotFound();

    db.Patients.Remove(patient);
    await db.SaveChangesAsync();
    return Results.Ok(patient);
})
.WithName("DeletePatient")
.WithTags("Patients")
.RequireAuthorization();

#endregion

#region PredictionApi's

app.MapGet("/predictions", async (ApplicationDbContext db) =>
{
    var predictions = await db.Predictions
        .Include(p => p.Patient)
        .Include(p => p.Doctor)
        .ToListAsync();

    var predictionDtos = predictions.Select(p => new PredictionDto
    {
        PredictionId = p.PredictionId,
        PatientId = p.PatientId,
        DoctorId = p.DoctorId,
        HasHeartDisease = p.HasHeartDisease,
        PredictionDate = p.PredictionDate,
        Patient = new PatientDto
        {
            Id = p.Patient.Id,
            Name = p.Patient.Name,
            DateOfBirth = p.Patient.DateOfBirth
        },
        Doctor = new DoctorDto
        {
            Id = p.Doctor.Id,
            Name = p.Doctor.Name
        }
    }).ToList();

    return Results.Ok(predictionDtos);
}).WithName("GetAllPredictions").WithTags("Predictions")
.RequireAuthorization();

app.MapGet("/predictions/{id}", async (int id, ApplicationDbContext db) =>
{
    var prediction = await db.Predictions
        .Include(p => p.Patient)
        .Include(p => p.Doctor)
        .FirstOrDefaultAsync(p => p.PredictionId == id);

    if (prediction == null)
    {
        return Results.NotFound();
    }

    var predictionDto = new PredictionDto
    {
        PredictionId = prediction.PredictionId,
        PatientId = prediction.PatientId,
        DoctorId = prediction.DoctorId,
        HasHeartDisease = prediction.HasHeartDisease,
        PredictionDate = prediction.PredictionDate,
        Patient = new PatientDto
        {
            Id = prediction.Patient.Id,
            Name = prediction.Patient.Name,
            DateOfBirth = prediction.Patient.DateOfBirth
        },
        Doctor = new DoctorDto
        {
            Id = prediction.Doctor.Id,
            Name = prediction.Doctor.Name
        }
    };

    return Results.Ok(predictionDto);
}).WithName("GetPredictionById").WithTags("Predictions")
.RequireAuthorization();

app.MapPost("/predictions", async (Prediction prediction, ApplicationDbContext db) =>
{
    db.Predictions.Add(prediction);
    await db.SaveChangesAsync();
    return Results.Created($"/predictions/{prediction.PredictionId}", prediction);
})
.WithName("CreatePrediction")
.WithTags("Predictions")
.RequireAuthorization();

app.MapPut("/predictions/{id}", async (int id, Prediction inputPrediction, ApplicationDbContext db) =>
{
    var prediction = await db.Predictions.FindAsync(id);
    if (prediction == null) return Results.NotFound();

    prediction.PatientId = inputPrediction.PatientId;
    prediction.DoctorId = inputPrediction.DoctorId;
    prediction.HasHeartDisease = inputPrediction.HasHeartDisease;
    prediction.PredictionDate = inputPrediction.PredictionDate;

    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("UpdatePrediction")
.WithTags("Predictions")
.RequireAuthorization();

app.MapDelete("/predictions/{id}", async (int id, ApplicationDbContext db) =>
{
    var prediction = await db.Predictions.FindAsync(id);
    if (prediction == null) return Results.NotFound();

    db.Predictions.Remove(prediction);
    await db.SaveChangesAsync();
    return Results.Ok();
})
.WithName("DeletePrediction")
.WithTags("Predictions")
.RequireAuthorization();

#endregion

#region DoctorApi's

app.MapGet("/doctors", async (ApplicationDbContext db) =>
{
    var doctors = await db.Doctors.Include(d => d.PredictionsMade).ToListAsync();

    var doctorDtos = doctors.Select(d => new DoctorDto
    {
        Id = d.Id,
        Name = d.Name
    }).ToList();

    return Results.Ok(doctorDtos);
}).WithName("GetAllDoctors").WithTags("Doctors")
.RequireAuthorization();

app.MapGet("/doctors/{id}", async (string id, ApplicationDbContext db) =>
{
    var doctor = await db.Doctors.Include(d => d.PredictionsMade).FirstOrDefaultAsync(d => d.Id == id);

    if (doctor == null)
    {
        return Results.NotFound();
    }

    var doctorDto = new DoctorDto
    {
        Id = doctor.Id,
        Name = doctor.Name
    };

    return Results.Ok(doctorDto);
}).WithName("GetDoctorById").WithTags("Doctors")
.RequireAuthorization();

app.MapPost("/doctors", async (Doctor doctor, ApplicationDbContext db) =>
{
    db.Doctors.Add(doctor);
    await db.SaveChangesAsync();
    return Results.Created($"/doctors/{doctor.Id}", doctor);
}).WithName("CreateDoctor").WithTags("Doctors")
.RequireAuthorization();

app.MapPut("/doctors/{id}", async (string id, Doctor inputDoctor, ApplicationDbContext db) =>
{
    var doctor = await db.Doctors.FindAsync(id);

    if (doctor == null) return Results.NotFound();

    doctor.Name = inputDoctor.Name;

    await db.SaveChangesAsync();

    return Results.NoContent();
}).WithName("UpdateDoctor").WithTags("Doctors")
.RequireAuthorization();

app.MapDelete("/doctors/{id}", async (string id, ApplicationDbContext db) =>
{
    var doctor = await db.Doctors.FindAsync(id);
    if (doctor == null) return Results.NotFound();

    db.Doctors.Remove(doctor);
    await db.SaveChangesAsync();
    return Results.Ok(doctor);
}).WithName("DeleteDoctor").WithTags("Doctors")
.RequireAuthorization();

#endregion

app.Run();
