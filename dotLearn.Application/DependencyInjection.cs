using dotLearn.Application.Services.Authentication;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;

using dotLearn.Infrastructure.Profile;
using dotLearn.Application.Services.Jobs;
using dotLearn.Application.Services.Test;
using dotLearn.Application.Services.Class;

namespace dotLearn.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<ITestService, TestService>();
            services.AddScoped<IClassService, ClassService>();
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
