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
        JobResult CreateJob(Job job);
        Task<List<Job>> GetJobs();
    }
}
