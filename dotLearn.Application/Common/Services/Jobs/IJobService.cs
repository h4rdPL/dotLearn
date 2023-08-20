using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Jobs
{
    public interface IJobService
    {
        Job CreateJob(Job job);
        Task<List<Job>> GetJobs();
        void DeleteJob(Job job, int jobId);
    }
}
