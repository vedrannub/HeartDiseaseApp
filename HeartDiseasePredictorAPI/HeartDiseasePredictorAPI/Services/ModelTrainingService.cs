using HeartDiseasePredictionApi.Models;
using Microsoft.ML;

namespace HeartDiseasePredictionApi.Services
{
    public class ModelTrainingService
    {
        private readonly MLContext _mlContext;
        private readonly string _modelPath;
        private readonly ILogger<ModelTrainingService> _logger;

        public ModelTrainingService(MLContext mlContext, IConfiguration configuration, ILogger<ModelTrainingService> logger)
        {
            _mlContext = mlContext;
            _modelPath = configuration["MLModel:ModelPath"];
            _logger = logger;
        }

        public void TrainModel(string dataPath)
        {
            _logger.LogInformation($"Starting to load data from {dataPath}");

            var data = _mlContext.Data.LoadFromTextFile<HeartDiseaseData>(dataPath, hasHeader: true, separatorChar: ';');

            // Log the number of rows loaded
            var rowCount = data.GetRowCount();
            var dataReal = data.Preview();
            _logger.LogInformation($"Loaded {rowCount} rows from the data file.");
            _logger.LogInformation($"Loaded {dataReal} rows from the data file.");


            // Ensure that there are rows in the data
            if (rowCount == 0)
            {
                throw new InvalidOperationException("Training set has 0 instances, aborting training.");
            }

            // Define the data preparation and training pipeline
            var pipeline = _mlContext.Transforms.Concatenate("Features",
                    nameof(HeartDiseaseData.Age),
                    nameof(HeartDiseaseData.Sex),
                    nameof(HeartDiseaseData.Cp),
                    nameof(HeartDiseaseData.Trestbps),
                    nameof(HeartDiseaseData.Chol),
                    nameof(HeartDiseaseData.Fbs),
                    nameof(HeartDiseaseData.Restecg),
                    nameof(HeartDiseaseData.Thalach),
                    nameof(HeartDiseaseData.Exang),
                    nameof(HeartDiseaseData.Oldpeak),
                    nameof(HeartDiseaseData.Slope),
                    nameof(HeartDiseaseData.Ca),
                    nameof(HeartDiseaseData.Thal))
                .Append(_mlContext.Transforms.NormalizeMinMax("Features"))
                .Append(_mlContext.BinaryClassification.Trainers.SdcaLogisticRegression(labelColumnName: nameof(HeartDiseaseData.Label), featureColumnName: "Features"));

            // Train the model
            var model = pipeline.Fit(data);

            // Save the model
            _mlContext.Model.Save(model, data.Schema, _modelPath);

            _logger.LogInformation($"Model training completed and saved to {_modelPath}");
        }
    }
}
