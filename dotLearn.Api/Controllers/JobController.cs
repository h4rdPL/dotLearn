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

        [HttpPost("job")]
        public async Task<ActionResult<Job>> Job(Job job)
        {
            var authResult = _jobService.CreateJob(job);
            var response = new JobResult(job);
            return Ok(response);
        }


        [HttpGet("getJobs")]
        public async Task<ActionResult<List<Job>>> GetJobsList()
        {
            var jobs = await Task.FromResult(_jobService.GetJobs());
            return Ok(jobs);
        }
    }
}
