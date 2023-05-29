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
        public IActionResult Job(Job job)
        {
            var authResult = _jobService.CreateJob(job);
            var response = new JobResult(job);
            return Ok(response);
        }


        [HttpGet("getJobs")]
        public List<Job> GetJobsList()
        {
            return _jobService.GetJobs();
        }
    }
}
