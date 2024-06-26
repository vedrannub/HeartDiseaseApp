using System;

namespace HeartDisease.Infrastructure.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string AppointmentList { get; set; }
        public string AppointmentDetails { get; set; }
    }
}
