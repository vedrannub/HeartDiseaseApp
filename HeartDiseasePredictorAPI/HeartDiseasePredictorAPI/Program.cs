using Microsoft.ML;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using HeartDiseasePredictionApi.Services;
using System;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Load the ML.NET model
var mlContext = new MLContext();
var modelPath = builder.Configuration["MLModel:ModelPath"];

ITransformer mlModel = null;
if (File.Exists(modelPath))
{
    mlModel = mlContext.Model.Load(modelPath, out var modelInputSchema);
    builder.Services.AddSingleton(mlModel);
}
else
{
    Console.WriteLine($"Warning: The model file '{modelPath}' does not exist. Please train the model using the /api/prediction/train endpoint.");
}
builder.Services.AddSingleton(mlContext);

// Add custom services
builder.Services.AddSingleton<ModelTrainingService>();
builder.Services.AddSingleton<PredictionService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
