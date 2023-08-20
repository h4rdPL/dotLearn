using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Services.Flashcards;
using dotLearn.Application.Services.Jobs;
using dotLearn.Domain.Entities;
using dotLearn.Infrastructure.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardController : ControllerBase
    {
        private readonly IFlashcardsService _flashCardsService;
        private readonly IUserRepository _userRepository;

        public FlashCardController(IFlashcardsService flashcardsService, IUserRepository userRepository)
        {
            _flashCardsService = flashcardsService;
            _userRepository = userRepository;
        }
        /// <summary>
        /// Creates a new flash card.
        /// </summary>
        /// <returns>Returns the newly created flash card entity.</returns>
        [HttpPost("create")]
        public void Create(FlashCard flashCard)
        {

            _flashCardsService.Create(flashCard);
        }

        /// <summary>
        /// Updates an existing flash card.
        /// </summary>
        /// <param name="flashCard">The updated flash card entity.</param>
        /// <returns>Returns the updated flash card entity.</returns>
        [HttpPut("update")]
        public async Task<ActionResult<FlashCard>> Update(FlashCard flashCard)
        {
            var updatedFlashCard = _flashCardsService.Update(flashCard);
            return await Task.FromResult(Ok(updatedFlashCard));
        }

    }
}
