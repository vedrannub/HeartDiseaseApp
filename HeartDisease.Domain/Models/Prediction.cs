
namespace HeartDisease.Infrastructure.Models
{
    public class Prediction
    {
        public int PredictionId { get; set; }
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public bool HasHeartDisease { get; set; }
        public DateTime PredictionDate { get; set; }
        public DateTime DateAdded { get; set; } // New field

        public int Age { get; set; }
        public int Sex { get; set; }
        public int Cp { get; set; }
        public int Trestbps { get; set; }
        public int Chol { get; set; }
        public int Fbs { get; set; }
        public int Restecg { get; set; }
        public int Thalach { get; set; }
        public int Exang { get; set; }
        public double Oldpeak { get; set; }
        public int Slope { get; set; }
        public int Ca { get; set; }
        public int Thal { get; set; }
        public int Num { get; set; }

        public virtual Patient Patient { get; set; }
        public virtual Doctor Doctor { get; set; }
    }
}
