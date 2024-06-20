
namespace HeartDisease.Infrastructure.Models
{
    public class Prediction
    {
        public int PredictionId { get; set; }
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public bool HasHeartDisease { get; set; }
        public DateTime PredictionDate { get; set; }

        public virtual Patient Patient { get; set; }
        public virtual Doctor Doctor { get; set; }
    }
}
