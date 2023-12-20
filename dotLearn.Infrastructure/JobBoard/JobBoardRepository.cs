using dotLearn.Application.Common.Interfaces.JobBoard;
using dotLearn.Domain.Entities;

namespace dotLearn.Infrastructure.JobBoard
{
    public class JobBoardRepository : IJobBoardRepository
    {
        private static List<Job> _jobs = new List<Job>();
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="job"></param>
        /// <param name="jobId"></param>
        public void Delete(Job job, int jobId)
        {
            var jobOffr = _jobs.FirstOrDefault(j => j.Id == jobId);
            if(jobOffr != null)
            {
                _context.Remove(jobOffr);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<Job> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
