using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.DTO
{
    public record struct StudentAndProfessorClassesDTO(
        int Id,
        string? ClassName,
        string? FirstName,
        string LastName,
        List<PdfFile> PdfFiles 
    );

}
