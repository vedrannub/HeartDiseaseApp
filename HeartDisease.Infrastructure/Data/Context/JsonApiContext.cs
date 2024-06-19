using System.Text.Json.Serialization;
using HeartDisease.Domain.Models;

namespace HeartDisease.Infrastructure.Context
{
    [JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
    [JsonSerializable(typeof(Patient))]
    [JsonSerializable(typeof(List<Patient>))]
    [JsonSerializable(typeof(Prediction))]
    [JsonSerializable(typeof(List<Prediction>))]
    [JsonSerializable(typeof(Doctor))]
    [JsonSerializable(typeof(List<Doctor>))]
    public partial class JsonApiContext : JsonSerializerContext
    {
    }
}
