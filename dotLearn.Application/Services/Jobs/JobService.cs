using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Jobs
{
    public class JobService : IJobService
    {
        private static List<Job> _jobs = new List<Job>();

        /// <summary>
        /// Creates a new job and adds it to the list of jobs.
        /// </summary>
        /// <param name="job">The job entity to be created.</param>
        /// <returns>Returns a JobResult object containing information about the created job.</returns>
        public JobResult CreateJob(Job job)
        {
            _jobs.Add(job);
            return new JobResult(job);
        }

        /// <summary>
        /// Retrieves the list of all jobs.
        /// </summary>
        /// <returns>Returns a list of all job entities.</returns>
        public async Task<List<Job>> GetJobs()
        {
            return await Task.FromResult(_jobs.ToList());
        }


    }
}
