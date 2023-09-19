using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Infrastructure.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Configuration;
using dotLearn.Application.Common.Interfaces.Validation;
using dotLearn.Infrastructure.Validation;
using dotLearn.Application.Common.Interfaces.JobBoard;
using dotLearn.Infrastructure.JobBoard;
using dotLearn.Application.Common.Interfaces.FlashCards;
using dotLearn.Infrastructure.FlashCards;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Infrastructure.Persistance;
using dotLearn.Application.Common.Interfaces.ClassPersistence;
using dotLearn.Infrastructure.ClassEntitities;
using dotLearn.Application.Common.Interfaces.Test;
using dotLearn.Infrastructure.Test;

namespace dotLearn.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager configuration)
        {
            // Repository injection
            services.AddScoped<IJobBoardRepository, JobBoardRepository>();
            services.AddScoped<IFlashCardsRepository, FlashCardsRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IClassRepository, ClassRepository>();
            services.AddScoped<ITestRepository, TestRepository>();

            services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
            services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddScoped<IValidator, Validator>();

            return services;

        }
    }
}
