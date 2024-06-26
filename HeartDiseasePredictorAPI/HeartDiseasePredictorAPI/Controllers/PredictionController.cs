using Microsoft.AspNetCore.Mvc;
using HeartDiseasePredictionApi.Models;
using HeartDiseasePredictionApi.Services;

namespace HeartDiseasePredictionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredictionController : ControllerBase
    {
        private readonly PredictionService _predictionService;
        private readonly ModelTrainingService _modelTrainingService;

        public PredictionController(PredictionService predictionService, ModelTrainingService modelTrainingService)
        {
            _predictionService = predictionService;
            _modelTrainingService = modelTrainingService;
        }

        [HttpPost]
        [Route("predict")]
        public ActionResult<HeartDiseasePredictionResult> Predict([FromBody] HeartDiseasePredictionModel input)
        {
            var result = _predictionService.Predict(input);
            return Ok(result);
        }

        [HttpPost]
        [Route("train")]
        public IActionResult Train([FromQuery] string dataPath)
        {
            _modelTrainingService.TrainModel(dataPath);
            return Ok("Model trained and saved successfully.");
        }
    }
}
