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
        public JobResult CreateJob(Job job)
        {
            _jobs.Add(job);
            return new JobResult(job);
        }


        public async Task<List<Job>> GetJobs()
        {
            return _jobs.ToList();
        }

    }
}
