using System;

namespace HeartDisease.Infrastructure.Models
{
    public class Medication
    {
        public int MedicationId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string MedicationList { get; set; }
    }
}
