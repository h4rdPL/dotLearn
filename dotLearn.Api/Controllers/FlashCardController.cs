using dotLearn.Application.Services.Flashcards;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
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
        /// <returns>Returns the newly created flash card entity.</returns>
        [HttpPost("create")]
        public async Task<IActionResult> Create(DeckDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _flashCardsService.Create(model);
            return Ok(model);
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

        /// <summary>
        /// Retrieves a list of decks associated with the currently authenticated student.
        /// </summary>
        /// <returns>An ActionResult containing a list of decks or a NotFound response if no decks are found.</returns>
        [HttpGet("getStudentDecks")]
        public async Task<ActionResult<DeckDTO>> GetFlashcards()
        {
            var decks = _flashCardsService.GetDecksByUserEmail();

            if (decks == null)
            {
                return NotFound("No decks found for the user");
            }
            return await Task.FromResult(Ok(decks));
        }

    }
}
