using dotLearn.Application.Services.Flashcards;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dotLearn.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardController : ControllerBase
    {
        private readonly IFlashcardsService _flashCardsService;
        public FlashCardController(IFlashcardsService flashcardsService)
        {
            _flashCardsService = flashcardsService;
        }
        /// <summary>
        /// Creates a new flash card.
        /// </summary>
        /// <param name="flashCard">The flash card entity to be created.</param>
        /// <returns>Returns the newly created flash card entity.</returns>
        [HttpPost("create")]
        public async Task<ActionResult<FlashCard>> Create(FlashCard flashCard)
        {
            var createdFlashCard = _flashCardsService.Create(flashCard);
            return await Task.FromResult(Ok(createdFlashCard));
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
