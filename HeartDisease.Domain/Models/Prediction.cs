using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeartDisease.Domain.Models
{
    public class Prediction
    {
        public int PredictionId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public bool HasHeartDisease { get; set; }
        public DateTime PredictionDate { get; set; }

        public virtual Patient Patient { get; set; }
        public virtual Doctor Doctor { get; set; }
    }

}
