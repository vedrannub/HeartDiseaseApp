using HeartDisease.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using HeartDisease.Domain.Models;
using System.Text.Json.Serialization;
using HeartDisease.Application.Dtos;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("HeartDiseaseDB")));

// Configure JSON serialization with the generated context
builder.Services.AddControllers().AddJsonOptions(options =>
{
/*    options.JsonSerializerOptions.TypeInfoResolver = JsonApiContext.Default;
*/    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;

});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://127.0.0.1:3000") // Allow your front-end URL
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Add Swagger services
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Heart Disease API", Version = "v1" });
    c.MapType<DateOnly>(() => new OpenApiSchema { Type = "string", Format = "date" });  // Example for custom types
});

var app = builder.Build();

// Configure the HTTP request pipeline.
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
app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");


// Minimal APIs

#region PatientApi's

// Get a specific patient by ID
app.MapGet("/patients/{id}", async (int id, ApplicationDbContext db) =>
{
    return await db.Patients.FindAsync(id)
        is Patient patient
            ? Results.Ok(patient)
            : Results.NotFound();
})
.WithName("GetPatientById")
.WithTags("Patients");

// Create a new patient
app.MapPost("/patient", async (Patient patient, ApplicationDbContext db) =>
{
    db.Patients.Add(patient);
    await db.SaveChangesAsync();
    return Results.Created($"/patient/{patient.PatientId}", patient);
})
.WithName("CreatePatient")
.WithTags("Patients");

// Update an existing patient
app.MapPut("/patients/{id}", async (int id, Patient inputPatient, ApplicationDbContext db) =>
{
    var patient = await db.Patients.FindAsync(id);

    if (patient is null) return Results.NotFound();

    patient.Name = inputPatient.Name;
    patient.DateOfBirth = inputPatient.DateOfBirth;
    // Update other properties as needed

    await db.SaveChangesAsync();

    return Results.NoContent();
})
.WithName("UpdatePatient")
.WithTags("Patients");

// Delete a patient
app.MapDelete("/patients/{id}", async (int id, ApplicationDbContext db) =>
{
    if (await db.Patients.FindAsync(id) is Patient patient)
    {
        db.Patients.Remove(patient);
        await db.SaveChangesAsync();
        return Results.Ok(patient);
    }

    return Results.NotFound();
})
.WithName("DeletePatient")
.WithTags("Patients");

#endregion

#region PredictionApi's

// Get all predictions
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
            PatientId = p.Patient.PatientId,
            Name = p.Patient.Name,
            DateOfBirth = p.Patient.DateOfBirth
        },
        Doctor = new DoctorDto
        {
            DoctorId = p.Doctor.DoctorId,
            Name = p.Doctor.Name
        }
    });

    return Results.Ok(predictionDtos);
}).WithName("GetAllPredictions").WithTags("Predictions");

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
            PatientId = prediction.Patient.PatientId,
            Name = prediction.Patient.Name,
            DateOfBirth = prediction.Patient.DateOfBirth
        },
        Doctor = new DoctorDto
        {
            DoctorId = prediction.Doctor.DoctorId,
            Name = prediction.Doctor.Name
        }
    };

    return Results.Ok(predictionDto);
}).WithName("GetPredictionById").WithTags("Predictions");

// Create a new prediction
app.MapPost("/predictions", async (Prediction prediction, ApplicationDbContext db) =>
{
    db.Predictions.Add(prediction);
    await db.SaveChangesAsync();
    return Results.Created($"/predictions/{prediction.PredictionId}", prediction);
})
.WithName("CreatePrediction")
.WithTags("Predictions");

// Update an existing prediction
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
.WithTags("Predictions");

// Delete a prediction
app.MapDelete("/predictions/{id}", async (int id, ApplicationDbContext db) =>
{
    var prediction = await db.Predictions.FindAsync(id);
    if (prediction == null) return Results.NotFound();

    db.Predictions.Remove(prediction);
    await db.SaveChangesAsync();
    return Results.Ok();
})
.WithName("DeletePrediction")
.WithTags("Predictions");


#endregion

#region DoctorApi's

// Get all doctors
app.MapGet("/doctors", async (ApplicationDbContext db) =>
{
    var doctors = await db.Doctors.Include(d => d.PredictionsMade).ToListAsync();

    var doctorDtos = doctors.Select(d => new DoctorDto
    {
        DoctorId = d.DoctorId,
        Name = d.Name
    }).ToList();

    return Results.Ok(doctorDtos);
}).WithName("GetAllDoctors").WithTags("Doctors");


// Get a doctor by ID
app.MapGet("/doctors/{id}", async (int id, ApplicationDbContext db) =>
{
    var doctor = await db.Doctors.Include(d => d.PredictionsMade).FirstOrDefaultAsync(d => d.DoctorId == id);

    if (doctor == null)
    {
        return Results.NotFound();
    }

    var doctorDto = new DoctorDto
    {
        DoctorId = doctor.DoctorId,
        Name = doctor.Name
    };

    return Results.Ok(doctorDto);
}).WithName("GetDoctorById").WithTags("Doctors");


// Create a new doctor
app.MapPost("/doctors", async (Doctor doctor, ApplicationDbContext db) =>
{
    db.Doctors.Add(doctor);
    await db.SaveChangesAsync();
    return Results.Created($"/doctors/{doctor.DoctorId}", doctor);
}).WithName("CreateDoctor").WithTags("Doctors");

// Update an existing doctor
app.MapPut("/doctors/{id}", async (int id, Doctor inputDoctor, ApplicationDbContext db) =>
{
    var doctor = await db.Doctors.FindAsync(id);

    if (doctor is null) return Results.NotFound();

    doctor.Name = inputDoctor.Name;

    await db.SaveChangesAsync();

    return Results.NoContent();
}).WithName("UpdateDoctor").WithTags("Doctors");

// Delete a doctor
app.MapDelete("/doctors/{id}", async (int id, ApplicationDbContext db) =>
{
    if (await db.Doctors.FindAsync(id) is Doctor doctor)
    {
        db.Doctors.Remove(doctor);
        await db.SaveChangesAsync();
        return Results.Ok(doctor);
    }

    return Results.NotFound();
}).WithName("DeleteDoctor").WithTags("Doctors");


#endregion

app.MapControllers();

app.Run();
