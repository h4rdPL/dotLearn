using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Flashcards
{
    public interface IFlashcardsService
    {
        public void Create(DeckDTO model);
        public bool Delete(int deckId);
        public FlashCard Update(FlashCard flashCard);
        public List<Deck> GetDecksByUserEmail();
    }
}
