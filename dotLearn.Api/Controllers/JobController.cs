using dotLearn.Application.Services.Jobs;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : Controller
    {
        private readonly IJobService _jobService;
        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="job"></param>
        /// <returns></returns>
        [HttpPost("job")]
        public async Task<ActionResult<Job>> Job(Job job)
        {
            var authResult = _jobService.CreateJob(job);
            var response = new JobResult(job);
            return await Task.FromResult(Ok(response));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getJobs")]
        public async Task<ActionResult<List<Job>>> GetJobsList()
        {
            var jobs = await _jobService.GetJobs();
            return Ok(jobs);
        }

    }
}
