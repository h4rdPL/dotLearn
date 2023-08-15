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
        /// 
        /// </summary>
        /// <param name="newClass"></param>
        /// <returns></returns>

        [HttpPost("createClass")]
        public async Task<ActionResult<ClassEntities>> CreateClass(ClassEntities newClass)
        {
            _classService.Create(newClass);
            return await Task.FromResult(newClass);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="myClass"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("joinClass")]
        public async Task<ActionResult<ClassEntities>> JoinToClass(Guid classCode, Guid studentId)
        {
            await _classService.JoinClass(classCode, studentId);
            return Ok();
        }




        /// <summary>
        /// 
        /// </summary>
        /// <param name="myClass"></param>
        /// <returns></returns>
        [HttpPost("leaveClass")]
        public async Task<ActionResult<bool>> LeaveClass(Guid classCode, Guid studentId)
        {
            await _classService?.RemoveStudentFromClass(classCode, studentId);
            return true;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="classCode"></param>
        /// <returns></returns>
        [HttpPost("removeClass")]
        public async Task<ActionResult<bool>> RemoveClass(Guid classCode)
        {
            _classService.RemoveClass(classCode);
            return true;
        }

    }
}
