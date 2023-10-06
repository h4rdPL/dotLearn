using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Common.Services.Class;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        public ClassController(IClassService classService, IJwtTokenGenerator jwtTokenGenerator)
        {
            _classService = classService;
            _jwtTokenGenerator = jwtTokenGenerator;
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

        [HttpPost("upload-pdf")]
        public async Task<IActionResult> UploadPdf(IFormFile formFile)
        {
            var professorId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
            var result = await _classService.AddPDFFile(professorId, formFile);
            return Ok(result);
        }

        [HttpGet("getPDFFiles")]
        public async Task<ActionResult<List<PdfFile>>> GetClassPDFFiles()
        {
            try
            {
                var userId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
                var result = await _classService.GetClassPDFFiles(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Możesz również zwrócić odpowiedni status błędu
            }
        }

        [HttpGet("download-pdf/{fileName}")]
        public IActionResult DownloadPdf(string fileName)
        {
            var userId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;


            var pdfFileContent = _classService.GetPdfFileContent(userId, fileName);

            if (pdfFileContent == null)
            {
                return NotFound(); // Zwróć NotFound, jeśli plik nie został znaleziony
            }

            // Ustaw odpowiednie nagłówki dla odpowiedzi HTTP
            Response.Headers.Add("Content-Disposition", $"inline; filename={fileName}");
            Response.Headers.Add("Content-Type", "application/pdf");

            // Zwróć plik PDF jako strumień
            return File(pdfFileContent.FileContent, "application/pdf");
        }





    }
}
