using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.DTO
{
    public record struct QuestionDTO(
        string QuestionName,
        int TestId,
        List<AnswerDTO> Answer
        );
}
