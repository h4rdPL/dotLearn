using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Services.Class;
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
        public async Task<ActionResult<ClassEntities>> CreateClass([FromBody] ClassEntities newClass)
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

        /// <summary>
        /// Joins a student to a class.
        /// </summary>
        /// <param name="classCode">The code of the class to join.</param>
        /// <param name="studentId">The ID of the student to join.</param>
        /// <returns>Returns the result of the join operation.</returns>
        //[HttpPost("joinClass")]
        //public async Task<ActionResult<ClassEntities>> JoinToClass(int classCode, Guid studentId)
        //{
        //    await _classService.  (classCode, studentId);
        //    return Ok();
        //}

        /// <summary>
        /// Leaves a class for a student.
        /// </summary>
        /// <param name="classCode">The code of the class to leave.</param>
        /// <param name="studentId">The ID of the student leaving the class.</param>
        /// <returns>Returns a boolean indicating the success of the leave operation.</returns>
        //[HttpPost("leaveClass")]
        //public async Task<ActionResult<bool>> LeaveClass(int classCode, Guid studentId)
        //{
        //    await _classService.RemoveStudentFromClass(classCode, studentId);
        //    return true;
        //}

        /// <summary>
        /// Removes a class.
        /// </summary>
        /// <param name="classCode">The code of the class to remove.</param>
        /// <returns>Returns a boolean indicating the success of the removal operation.</returns>
        //[HttpPost("removeClass")]
        //public async Task<ActionResult<bool>> RemoveClass(int classCode)
        //{
        //    _classService.Delete(classCode);
        //    return true;
        //}


    }
}
