using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;

namespace dotLearn.Application.Services.Flashcards
{
    public interface IFlashcardsService
    {
        public void Create(DeckDTO model);
        public bool Delete(int deckId);
        public FlashCard Update(FlashCard flashCard);
        public List<DeckDTO> GetDecksByUserEmail();
    }
}
