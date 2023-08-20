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
        /// Creates a new job posting.
        /// </summary>
        /// <param name="job">The job posting to be created.</param>
        /// <returns>Returns the newly job created.</returns>
        [HttpPost("create")]
        public async Task<ActionResult<Job>> CreateJob(Job job)
        {
            var createdJob = _jobService.CreateJob(job);
            //var response = new JobResult(createdJob);
            return await Task.FromResult(Ok(createdJob));
        }

        /// <summary>
        /// Retrieves a list of all available job offers.
        /// </summary>
        /// <returns>Returns a list of job postings.</returns>
        [HttpGet("getJobs")]
        public async Task<ActionResult<List<Job>>> GetJobsList()
        {
            var jobsList = await _jobService.GetJobs();
            return Ok(jobsList);
        }
        [HttpDelete("deleteJob")]
        public void DeleteJob(Job job, int jobId)
        {
            _jobService.DeleteJob(job, jobId);
        }
    }
}
