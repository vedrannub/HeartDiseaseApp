using HeartDisease.Domain.Models;
using HeartDisease.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;


namespace HeartDisease.Infrastructure.Repository
{
    public class PatientRepository : IPatientRepository
    {
        private readonly ApplicationDbContext _context;

        public PatientRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Patient> GetPatientByIdAsync(int patientId)
        {
            return await _context.Patients.FindAsync(patientId);
        }

        public async Task<IEnumerable<Patient>> GetAllPatientsAsync()
        {
            return await _context.Patients.ToListAsync();
        }
    }
}
