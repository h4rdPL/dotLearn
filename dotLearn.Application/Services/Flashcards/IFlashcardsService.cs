using dotLearn.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Flashcards
{
    public interface IFlashcardsService
    {
        public Task<FlashCard> Create(FlashCard flashCard);
        public bool Delete(FlashCard flashCard);
        public FlashCard Update(FlashCard flashCard);
    }
}
