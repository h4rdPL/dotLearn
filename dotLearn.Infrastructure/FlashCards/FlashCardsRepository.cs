using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Application.Common.Interfaces.FlashCards;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        public async Task<Deck> Create(Deck deck)
        {
            _context.Add(deck);
            await _context.SaveChangesAsync();
            return deck;
        }
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
