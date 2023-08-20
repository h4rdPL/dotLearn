using dotLearn.Application.Common.Interfaces.JobBoard;
using dotLearn.Domain.Entities;
using dotLearn.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Infrastructure.JobBoard
{
    public class JobBoardRepository : IJobBoardRepository
    {
        private readonly DotLearnDbContext _context;

        public JobBoardRepository(DotLearnDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Add jobs to the database
        /// </summary>
        /// <param name="job">Job entitie</param>
        public void Add(Job job)
        {
            _context.Add(job);
            _context.SaveChanges();
        }

        public void Delete(Job job, int jobId)
        {
            var jobOffr = _context.Jobs.FirstOrDefault(j => j.Id == jobId);
            if(jobOffr != null)
            {
                _context.Remove(jobOffr);
                _context.SaveChanges();
            }
        }

        public List<Job> GetAll()
        {
            var query = _context.Jobs
                .Include(j => j.Offer)
                .Include(j => j.Expectations)
                .Include(j => j.Benefits);
            return query.ToList();     
        }
    }
}
