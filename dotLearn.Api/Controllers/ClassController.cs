using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Services.Class;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        /// <summary>
        /// Creates a new class.
        /// </summary>
        /// <param name="newClass">The class entity to be created.</param>
        /// <returns>Returns the newly created class entity.</returns>
        [HttpPost("createClass")]
        public async Task<ActionResult<ClassEntities>> CreateClass([FromBody] ClassDTO newClass)
        {
            try
            {
                var createdClass = await _classService.Create(newClass);
                return Ok(createdClass);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetClass")]
        public async Task<ActionResult<StudentAndProfessorClassesDTO>> GetClass()
        {
            var result = _classService.GetClass();
            return await Task.FromResult(Ok(result));    

        }
    }
}
