using dotLearn.Application.Common.Interfaces.FlashCards;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace dotLearn.Infrastructure.FlashCards
{
    public class FlashCardsRepository : IFlashCardsRepository
    {

        private readonly DotLearnDbContext _context;
        public FlashCardsRepository(DotLearnDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Creates a new deck.
        /// </summary>
        /// <param name="deck">The deck to be created.</param>
        /// <returns>An asynchronous task representing the created Deck.</returns>
        public async Task<Deck> Create(Deck deck)
        {
            _context.Add(deck);
            await _context.SaveChangesAsync();
            return deck;
        }


        /// <summary>
        /// Deletes a deck by its ID.
        /// </summary>
        /// <param name="deckId">The ID of the deck to delete.</param>
        /// <returns>True if the deck is successfully deleted; otherwise, false.</returns>
        public bool Delete(int deckId)
        {
            try
            {
                var deckToDelete = _context.Decks.SingleOrDefault(d => d.Id == deckId);

                if (deckToDelete == null)
                {
                    return false;
                }
                _context.Decks.Remove(deckToDelete);
                _context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                // Handle exceptions, log errors, or return an appropriate response
                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }

        }   
        /// <summary>
        /// Retrieves a list of decks for a user by user ID.
        /// </summary>
        /// <param name="userId">The ID of the user.</param>
        /// <returns>A list of DeckDTOs representing the user's decks and associated flash cards.</returns>
        public List<DeckDTO> GetDecksByUserId(int userId)
        {
            var decksForUser = _context.Decks
                .Include(deck => deck.FlashCards)
                .Where(deck => deck.StudentId == userId)
                .ToList();

            var deckDTOs = decksForUser.Select(deck => new DeckDTO
            {
                Name = deck.Name,
                Category = deck.Category,
                flashCards = deck.FlashCards.Select(flashCard => new FlashCardDTO
                {
                    Id = flashCard.Id,
                    Content = flashCard.Content,
                    Definition = flashCard.Definition,
                }).ToList()
            }).ToList();

            return deckDTOs;
        }


    }
}
