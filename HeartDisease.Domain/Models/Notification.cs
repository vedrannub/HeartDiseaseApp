using System;

namespace HeartDisease.Infrastructure.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string NotificationText { get; set; }
        public DateTime NotificationDate { get; set; }
    }
}
