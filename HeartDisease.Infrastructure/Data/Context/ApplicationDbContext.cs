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
        public DbSet<Report> Reports { get; set; }
        public DbSet<Suggestion> Suggestions { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<HealthData> HealthData { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Medication> Medications { get; set; }
        public DbSet<TreatmentPlan> TreatmentPlans { get; set; }

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
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Doctor)
                      .WithMany(d => d.PredictionsMade)
                      .HasForeignKey(e => e.DoctorId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for Report
            modelBuilder.Entity<Report>(entity =>
            {
                entity.HasKey(e => e.ReportId);

                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for Suggestion
            modelBuilder.Entity<Suggestion>(entity =>
            {
                entity.HasKey(e => e.SuggestionId);

                entity.HasOne(e => e.Patient)
                      .WithMany()
                      .HasForeignKey(e => e.PatientId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Doctor)
                      .WithMany()
                      .HasForeignKey(e => e.DoctorId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for Appointment
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.AppointmentId);

                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for HealthData
            modelBuilder.Entity<HealthData>(entity =>
            {
                entity.HasKey(e => e.HealthDataId);

                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for Message
            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasKey(e => e.MessageId);

                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for Notification
            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasKey(e => e.NotificationId);

                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for Medication
            modelBuilder.Entity<Medication>(entity =>
            {
                entity.HasKey(e => e.MedicationId);

                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Configure the relationships for TreatmentPlan
            modelBuilder.Entity<TreatmentPlan>(entity =>
            {
                entity.HasKey(e => e.TreatmentPlanId);

                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
