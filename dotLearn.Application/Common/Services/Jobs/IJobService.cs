using dotLearn.Domain.Entities;

namespace dotLearn.Application.Services.Jobs
{
    public interface IJobService
    {
        Job CreateJob(Job job);
        Task<List<Job>> GetJobs();
        void DeleteJob(Job job, int jobId);
    }
}
