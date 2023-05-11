using Backend.Models;
using Backend.Models.Dto;
using Backend.Services.ClassService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
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
        /// 
        /// </summary>
        /// <param name="classModel"></param>
        /// <returns></returns>
        [HttpPost("CreateClass")]
        public bool CreateClass(ClassDTO classDTO) 
        {
           return _classService.CreateClass(classDTO);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="classCode"></param>
        /// <returns></returns>
        [HttpPost("ClassEnrollment")]
        public bool JoinToClass(string classCode)
        {
            return _classService.ClassEnrollment(classCode);
        }
    }
}
