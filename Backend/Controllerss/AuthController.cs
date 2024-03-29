﻿using Backend.Models;
using Backend.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Backend.Services.UserService.UserService;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        HttpClient httpClient = new HttpClient();

        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;


        /// <summary>
        /// Adding user service repository and configuration to current scope
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="userService"></param>
        public AuthController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        /// <summary>
        /// This method allows user to register
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns>bool</returns>
        /// 
        [HttpPost("Register")]
        public bool Register(UserDTO userDTO)
        {
            return _userService.RegisterUser(userDTO);
        }

        /// <summary>
        /// This method allows user to login
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        /// 

        [HttpPost("Login")]
        public string Login ( UserDTO userDTO)
        {
            return _userService.Login(userDTO);
        }
    }
}
