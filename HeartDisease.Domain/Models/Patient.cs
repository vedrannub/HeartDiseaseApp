using System;
using System.Collections.Generic;

namespace HeartDisease.Domain.Models
{
    public class Patient
    {
        public int PatientId { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public virtual ICollection<Prediction> Predictions { get; set; }

    }
}
