using Microsoft.ML;
using HeartDiseasePredictionApi.Models;

namespace HeartDiseasePredictionApi.Services
{
    public class PredictionService
    {
        private readonly ITransformer _mlModel;
        private readonly MLContext _mlContext;

        public PredictionService(ITransformer mlModel, MLContext mlContext)
        {
            _mlModel = mlModel;
            _mlContext = mlContext;
        }

        public HeartDiseasePredictionResult Predict(HeartDiseasePredictionModel input)
        {
            var predictionEngine = _mlContext.Model.CreatePredictionEngine<HeartDiseasePredictionModel, HeartDiseasePredictionResult>(_mlModel);
            var result = predictionEngine.Predict(input);
            return result;
        }
    }
}
