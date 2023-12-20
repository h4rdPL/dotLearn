using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;

namespace dotLearn.Application.Common.Interfaces.FlashCards
{
    public interface IFlashCardsRepository
    {
        Task<Deck> Create(Deck deck);
        bool Delete (int deckId);    
        List<DeckDTO> GetDecksByUserId(int userId);
        
    }
}
