﻿using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.DTO
{
    public record struct TestDTO(
        int Id,
        string? TestName,
        int Time,
        DateTime ActiveDate,
        DateTime EndDate,
        int ClassId,
        string ProfessorFirstName, 
        string ProfessorLastName,  
        List<QuestionDTO> Questions,
        UserTestDTO UserTestData
    );






}
