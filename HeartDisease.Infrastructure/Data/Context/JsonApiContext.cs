using System.Text.Json.Serialization;
using HeartDisease.Infrastructure.Models;

namespace HeartDisease.Infrastructure.Context
{
    [JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
    [JsonSerializable(typeof(User))]
    [JsonSerializable(typeof(List<User>))]
    [JsonSerializable(typeof(Prediction))]
    [JsonSerializable(typeof(List<User>))]
    [JsonSerializable(typeof(User))]
    [JsonSerializable(typeof(List<User>))]
    public partial class JsonApiContext : JsonSerializerContext
    {
    }
}
