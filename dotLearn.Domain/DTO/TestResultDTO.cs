using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.DTO
{
    public record struct TestResultDTO(
        int ClassId,
        string TestName,
        string ClassName,
        int Grade,
        DateTime ActiveDate
        );
}
