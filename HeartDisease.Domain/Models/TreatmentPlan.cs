using System;

namespace HeartDisease.Infrastructure.Models
{
    public class TreatmentPlan
    {
        public int TreatmentPlanId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string TreatmentPlanDetails { get; set; }
        public string Progress { get; set; }
    }
}
