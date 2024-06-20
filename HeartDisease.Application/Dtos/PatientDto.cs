using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeartDisease.Application.Dtos
{
    public class PatientDto
    {
        public string Id { get; set; } 
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
