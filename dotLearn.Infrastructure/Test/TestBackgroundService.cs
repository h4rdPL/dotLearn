using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection; // Dodaj tę dyrektywę
using dotLearn.Infrastructure; // Zakładać, że to jest przestrzeń nazw, w której znajduje się DotLearnDbContext

public class TestBackgroundService : IHostedService, IDisposable
{
    private int executionCount = 0;
    private readonly ILogger<TestBackgroundService> _logger;
    private readonly IServiceProvider _serviceProvider; // Dodaj IServiceScopeFactory
    private Timer? _timer = null;

    public TestBackgroundService(ILogger<TestBackgroundService> logger, IServiceProvider serviceProvider) // Dodaj IServiceScopeFactory do konstruktora
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Timed Hosted Service running.");
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
        await Task.CompletedTask;
    }

    private void DoWork(object? state)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var scopedServices = scope.ServiceProvider;
            var context = scopedServices.GetRequiredService<DotLearnDbContext>();

            var currentDate = DateTime.UtcNow;

            var testsToOpen = context.Tests
                .Where(test => test.ActiveDate <= currentDate)
                .ToList();

            var count = Interlocked.Increment(ref executionCount);

            context.SaveChanges();

            //_logger.LogInformation("Timed Hosted Service is working. Count: {Count}", count);
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Timed Hosted Service is stopping.");

        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}
