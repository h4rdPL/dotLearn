﻿using dotLearn.Application.Services.Test;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;
        public TestController(ITestService testService)
        {
            _testService = testService;
        }
        [HttpPost("create")]
        public async Task<ActionResult<TestClass>> CreateTest(TestClass testClass)
        {
            _testService.Create(testClass);
            return Ok(testClass);
        }
    }
}
