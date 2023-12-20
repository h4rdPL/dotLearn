using dotLearn.Application.Common.Interfaces.JobBoard;
using dotLearn.Domain.Entities;

namespace dotLearn.Application.Services.Jobs
{
    public class JobService : IJobService
    {
        private readonly IJobBoardRepository _JobBoardRepository;
        public JobService(IJobBoardRepository jobBoardRepository)
        {
            _JobBoardRepository = jobBoardRepository;
        }
        /// <summary>
        /// Creates a new job and adds it to the list of jobs.
        /// </summary>
        /// <param name="job">The job entity to be created.</param>
        /// <returns>Returns a JobResult object containing information about the created job.</returns>
        public Job CreateJob(Job job)
        {
            _JobBoardRepository.Add(job);
            return job;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="job"></param>
        /// <param name="jobId"></param>
        public void DeleteJob(Job job, int jobId)
        {
            _JobBoardRepository.Delete(job, jobId); 
        }

        /// <summary>
        /// Retrieves the list of all jobs.
        /// </summary>
        /// <returns>Returns a list of all job entities.</returns>
        public async Task<List<Job>> GetJobs()
        {
            return _JobBoardRepository.GetAll();

        }
    }
}
