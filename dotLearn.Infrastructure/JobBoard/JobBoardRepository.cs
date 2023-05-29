using dotLearn.Application.Common.Interfaces.JobBoard;
using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.JobBoard
{
    public class JobBoardRepository : IJobBoardRepository
    {
        private static readonly List<Job> _jobs = new();
        
        public void Add(Job job)
        {
            _jobs.Add(job);
        }

        public List<Job> GetAll()
        {
            return (List<Job>)(from job in _jobs select job);
        }
    }
}
