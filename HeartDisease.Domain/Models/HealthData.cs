using System;

namespace HeartDisease.Infrastructure.Models
{
    public class HealthData
    {
        public int HealthDataId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string PersonalHealthData { get; set; }
        public string HealthDataTrends { get; set; }
    }
}