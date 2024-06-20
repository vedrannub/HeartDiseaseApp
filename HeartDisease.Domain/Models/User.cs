using Microsoft.AspNetCore.Identity;

namespace HeartDisease.Infrastructure.Models
{
    public class User : IdentityUser
    {
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }

    public class Doctor : User
    {
        public virtual ICollection<Prediction> PredictionsMade { get; set; }
        public string Name { get; set; }
    }

    public class Patient : User
    {
        public virtual ICollection<Prediction> Predictions { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Name { get; set; }
    }
}
