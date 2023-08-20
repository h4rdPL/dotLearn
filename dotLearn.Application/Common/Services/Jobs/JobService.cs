using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotLearn.Application.Common.Interfaces.JobBoard;

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
