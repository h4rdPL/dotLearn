using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Common.Interfaces.JobBoard
{
    public interface IJobBoardRepository
    {
        void Add(Job job);
        List<Job> GetAll();
    }
}
