using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.Authentication
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public int ExpiryMinutes { get; init; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
