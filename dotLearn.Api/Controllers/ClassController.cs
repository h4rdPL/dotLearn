﻿using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Services.Class;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

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

        /// <summary>
        /// Get the details of the class including students and professor.
        /// </summary>
        /// <returns>Details of the class as a StudentAndProfessorClassesDTO.</returns>
        [HttpGet("GetClass")]
        public async Task<ActionResult<StudentAndProfessorClassesDTO>> GetClass()
        {
            var result = _classService.GetClass();
            return await Task.FromResult(Ok(result));
        }

        /// <summary>
        /// Uploads a PDF file for a specific class.
        /// </summary>
        /// <param name="id">Class ID.</param>
        /// <param name="formFile">PDF file to upload.</param>
        /// <returns>ActionResult representing the result of the upload operation.</returns>
        [HttpPost("upload-pdf")]
        public async Task<IActionResult> UploadPdf(string id, IFormFile formFile)
        {
            var classId = int.Parse(id);
            var professorId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
            var result = await _classService.AddPDFFile(professorId, formFile, classId);
            return Ok(result);
        }

        /// <summary>
        /// Get the list of PDF files associated with a class.
        /// </summary>
        /// <returns>List of PDF files as ActionResult.</returns>
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
                return StatusCode(500, ex.Message);
            }
        }

        /// <summary>
        /// Downloads a specific PDF file associated with a class.
        /// </summary>
        /// <param name="fileName">Name of the PDF file to download.</param>
        /// <returns>PDF file content as FileResult.</returns>
        [HttpGet("download-pdf/{fileName}")]
        public IActionResult DownloadPdf(string fileName)
        {
            var userId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
            var pdfFileContent = _classService.GetPdfFileContent(userId, fileName);

            if (pdfFileContent == null)
            {
                return NotFound();
            }

            Response.Headers.Add("Content-Disposition", $"inline; filename={fileName}");
            Response.Headers.Add("Content-Type", "application/pdf");

            return File(pdfFileContent.FileContent, "application/pdf");
        }

        /// <summary>
        /// Joins a student to a class using a class code.
        /// </summary>
        /// <param name="classCode">Class code for joining.</param>
        /// <returns>Details of the class entity for the student.</returns>
        [HttpPost("JoinToClassByCode")]
        public async Task<ClassEntitiesStudent> JoinToClassByCode(string classCode)
        {
            try
            {
                var userId = _jwtTokenGenerator.GetProfessorIdFromJwt().Id;
                var result = await _classService.JoinToClassByCode(userId, classCode);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Get the number of students in a class.
        /// </summary>
        /// <param name="classId">Class ID.</param>
        /// <returns>Number of students in the class.</returns>
        [HttpGet("getStudentsList")]
        public async Task<int> GetNumberOfStudents(int classId)
        {
            var result = await _classService.GetNumberOfStudents(classId);
            return result;
        }

    }
}
