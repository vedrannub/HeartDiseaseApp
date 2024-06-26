using System;

namespace HeartDisease.Infrastructure.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string MessageThreads { get; set; }
        public string ThreadStatus { get; set; }
        public string MiniThreadStyle { get; set; }
    }
}
