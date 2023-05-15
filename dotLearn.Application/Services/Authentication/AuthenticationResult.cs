﻿using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Authentication
{
    public record AuthenticationResult(
        //Guid Id,
        //string FirstName,
        //string LastName,
        //string Email,
        User user,
        string Token
    );
}
