using Microsoft.ML.Data;

namespace HeartDiseasePredictionApi.Models
{
    public class HeartDiseasePredictionModel
    {
        [LoadColumn(0)]
        public float Age { get; set; }

        [LoadColumn(1)]
        public float Sex { get; set; }

        [LoadColumn(2)]
        public float Cp { get; set; }

        [LoadColumn(3)]
        public float Trestbps { get; set; }

        [LoadColumn(4)]
        public float Chol { get; set; }

        [LoadColumn(5)]
        public float Fbs { get; set; }

        [LoadColumn(6)]
        public float Restecg { get; set; }

        [LoadColumn(7)]
        public float Thalach { get; set; }

        [LoadColumn(8)]
        public float Exang { get; set; }

        [LoadColumn(9)]
        public float Oldpeak { get; set; }

        [LoadColumn(10)]
        public float Slope { get; set; }

        [LoadColumn(11)]
        public float Ca { get; set; }

        [LoadColumn(12)]
        public float Thal { get; set; }

        [LoadColumn(13)]
        public bool Label { get; set; } // assuming the label is in the 14th column
    }

    public class HeartDiseasePredictionResult
    {
        public bool HasHeartDisease { get; set; }
        public float Probability { get; set; }
    }

    public class HeartDiseaseData
    {
        [LoadColumn(0)]
        public float Age { get; set; }

        [LoadColumn(1)]
        public float Sex { get; set; }

        [LoadColumn(2)]
        public float Cp { get; set; }

        [LoadColumn(3)]
        public float Trestbps { get; set; }

        [LoadColumn(4)]
        public float Chol { get; set; }

        [LoadColumn(5)]
        public float Fbs { get; set; }

        [LoadColumn(6)]
        public float Restecg { get; set; }

        [LoadColumn(7)]
        public float Thalach { get; set; }

        [LoadColumn(8)]
        public float Exang { get; set; }

        [LoadColumn(9)]
        public float Oldpeak { get; set; }

        [LoadColumn(10)]
        public float Slope { get; set; }

        [LoadColumn(11)]
        public float Ca { get; set; }

        [LoadColumn(12)]
        public float Thal { get; set; }

        [LoadColumn(13)]
        public bool Label { get; set; } // assuming the label is in the 14th column
    }
}
