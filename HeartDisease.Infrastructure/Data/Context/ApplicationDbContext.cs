using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using HeartDisease.Infrastructure.Models;

namespace HeartDisease.Infrastructure.Context
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Prediction> Predictions { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ensure the key is configured on the base type 'User'
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            // Configure the derived types
            modelBuilder.Entity<Patient>().HasBaseType<User>();
            modelBuilder.Entity<Doctor>().HasBaseType<User>();

            // Configure the relationships for Prediction
            modelBuilder.Entity<Prediction>(entity =>
            {
                entity.HasKey(e => e.PredictionId);

                entity.HasOne(e => e.Patient)
                      .WithMany(p => p.Predictions)
                      .HasForeignKey(e => e.PatientId)
                      .OnDelete(DeleteBehavior.Restrict); // Use Restrict to avoid cycles or multiple cascade paths

                entity.HasOne(e => e.Doctor)
                      .WithMany(d => d.PredictionsMade)
                      .HasForeignKey(e => e.DoctorId)
                      .OnDelete(DeleteBehavior.Restrict); // Use Restrict to avoid cycles or multiple cascade paths
            });
        }
    }
}
