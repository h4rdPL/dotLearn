using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Common.Interfaces.FlashCards
{
    public interface IFlashCardsRepository
    {
        Task<Deck> Create(Deck deck);
        bool Delete (int deckId);    
        List<Deck> GetDecksByUserId(int userId);
    }
}
