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
        /// 
        /// </summary>
        /// <param name="flashCard"></param>
        /// <returns></returns>
        [HttpPost("create")]
        public async Task<ActionResult<List<FlashCard>>> Create(FlashCard flashCard)
        {
            var flashCardResult = _flashCardsService.Create(flashCard); 
            return await Task.FromResult(Ok(flashCardResult));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="flashCard"></param>
        /// <returns></returns>
        [HttpPut("update")]
        public async Task<ActionResult<FlashCard>> Update(FlashCard flashCard)
        {
            var updatedFlashCard = _flashCardsService.Update(flashCard);  
            return await Task.FromResult(Ok(updatedFlashCard));

        }
    }
}
