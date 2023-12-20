using dotLearn.Domain.Entities;

namespace dotLearn.Application.Common.Interfaces.JobBoard
{
    public interface IJobBoardRepository
    {
        void Add(Job job);
        List<Job> GetAll();
        void Delete(Job job, int jobId);
    }
}
