using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Infrastructure;
using dotLearn.Application;
using Microsoft.OpenApi.Models;
using dotLearn.Domain.Data.Enum;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using dotLearn.Infrastructure.Database;
using System.Text.Json.Serialization;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplication().AddInfrastructure(builder.Configuration);
builder.Services.AddDbContext<DotLearnDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), b =>
    {
        b.MigrationsAssembly("dotLearn.Infrastructure");
    });
});
builder.Services.AddControllersWithViews().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.PropertyNamingPolicy = null;
    opt.JsonSerializerOptions.AllowTrailingCommas = true;
    opt.JsonSerializerOptions.NumberHandling = JsonNumberHandling.AllowReadingFromString |
        JsonNumberHandling.WriteAsString;
    opt.JsonSerializerOptions.IncludeFields = true;
});

var options = new JsonSerializerOptions()
{
    NumberHandling = JsonNumberHandling.AllowReadingFromString |
     JsonNumberHandling.WriteAsString
};


builder.Services.AddControllers().
    AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = "dotLearn",
            ValidateIssuerSigningKey = true,
            ValidIssuer = "dotLearn",
            IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes("super-secret-key-from-users-secrets")),

        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("StudentPolicy", policy =>
    {
        policy.RequireClaim(ClaimTypes.Role, Role.Student.ToString());;
    });
    options.AddPolicy("ProfessorPolicy", policy =>
    {
        policy.RequireClaim(ClaimTypes.Role, Role.Professor.ToString());
    });
});
builder.Services.AddCors(p => p.AddPolicy("corspolicy", build => {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Test01", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "e"
                }
            },
            new string[] {}
        }
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corspolicy");

app.UseAuthentication();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
