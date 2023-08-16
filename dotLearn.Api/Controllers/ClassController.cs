using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Services.Class;
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
        private readonly IUserRepository _userRepository;

        public ClassController(IClassService classService, IUserRepository userRepository)
        {
            _classService = classService;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Creates a new class.
        /// </summary>
        /// <param name="newClass">The class entity to be created.</param>
        /// <returns>Returns the newly created class entity.</returns>
        [HttpPost("createClass")]
        public async Task<ActionResult<ClassEntities>> CreateClass(ClassEntities newClass)
        {
            _classService.Create(newClass);
            return await Task.FromResult(newClass);
        }

        /// <summary>
        /// Joins a student to a class.
        /// </summary>
        /// <param name="classCode">The code of the class to join.</param>
        /// <param name="studentId">The ID of the student to join.</param>
        /// <returns>Returns the result of the join operation.</returns>
        [HttpPost("joinClass")]
        public async Task<ActionResult<ClassEntities>> JoinToClass(Guid classCode, Guid studentId)
        {
            await _classService.JoinClass(classCode, studentId);
            return Ok();
        }

        /// <summary>
        /// Leaves a class for a student.
        /// </summary>
        /// <param name="classCode">The code of the class to leave.</param>
        /// <param name="studentId">The ID of the student leaving the class.</param>
        /// <returns>Returns a boolean indicating the success of the leave operation.</returns>
        [HttpPost("leaveClass")]
        public async Task<ActionResult<bool>> LeaveClass(Guid classCode, Guid studentId)
        {
            await _classService?.RemoveStudentFromClass(classCode, studentId);
            return true;
        }

        /// <summary>
        /// Removes a class.
        /// </summary>
        /// <param name="classCode">The code of the class to remove.</param>
        /// <returns>Returns a boolean indicating the success of the removal operation.</returns>
        [HttpPost("removeClass")]
        public async Task<ActionResult<bool>> RemoveClass(Guid classCode)
        {
            _classService.RemoveClass(classCode);
            return true;
        }


    }
}
