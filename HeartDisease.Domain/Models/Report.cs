using System;

namespace HeartDisease.Infrastructure.Models
{
    public class Report
    {
        public int ReportId { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string ReportSummary { get; set; }
        public string DetailedReports { get; set; }
        public string GraphicalReports { get; set; }
        public string DownloadableReports { get; set; }
    }
}