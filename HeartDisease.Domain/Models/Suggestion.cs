using System;

namespace HeartDisease.Infrastructure.Models
{
    public class Suggestion
    {
        public int SuggestionId { get; set; }
        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public string PatientId { get; set; }
        public Patient Patient { get; set; }
        public string SuggestionText { get; set; }
        public string DetailedViewOfSuggestions { get; set; }
    }
}
