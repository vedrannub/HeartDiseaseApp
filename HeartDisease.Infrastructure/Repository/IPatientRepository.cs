﻿using HeartDisease.Infrastructure.Models;


namespace HeartDisease.Infrastructure.Repository
{
    public interface IPatientRepository
    {
        Task<Patient> GetPatientByIdAsync(int patientId);
        Task<IEnumerable<Patient>> GetAllPatientsAsync();
    }

}
