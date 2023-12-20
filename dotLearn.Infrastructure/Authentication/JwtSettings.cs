namespace dotLearn.Infrastructure.Authentication
{
    public class JwtSettings
    {
        public const string SectionName = "JwtSettings";
        public string? Secret { get; set; } = "super-secret-key";
        public int ExpiryMinutes { get; init; }
        public string? Issuer { get; set; } = "dotLearn";
        public string? Audience { get; set; } = "dotLearn";
    }
}
