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
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});




builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.AllowTrailingCommas = true;
    options.JsonSerializerOptions.NumberHandling = JsonNumberHandling.AllowReadingFromString | JsonNumberHandling.WriteAsString;
    options.JsonSerializerOptions.IncludeFields = true;
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve; // Dodaj to
});

var options = new JsonSerializerOptions()
{
    NumberHandling = JsonNumberHandling.AllowReadingFromString |
     JsonNumberHandling.WriteAsString
};


builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers().
    AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateAudience = false, // Ustawienie na false, jeœli nie chcesz weryfikowaæ odbiorcy (Audience)
        ValidateIssuer = false, // Ustawienie na false, jeœli nie chcesz weryfikowaæ wydawcy (Issuer)
        RequireSignedTokens = true,
        ValidateIssuerSigningKey = true,    
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("My secret from application config")),
        // Includ the kid validation here if needed
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
    build.WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials();
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
                    Id = "Bearer"
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
