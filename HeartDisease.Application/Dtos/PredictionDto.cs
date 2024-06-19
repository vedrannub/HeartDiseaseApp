using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeartDisease.Application.Dtos
{
    public class PredictionDto
    {
        public int PredictionId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public bool HasHeartDisease { get; set; }
        public DateTime PredictionDate { get; set; }
        public PatientDto Patient { get; set; }
        public DoctorDto Doctor { get; set; }
    }
}
