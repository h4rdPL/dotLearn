using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Application.Common.Interfaces.FlashCards;
using dotLearn.Domain.Entities;
using dotLearn.Infrastructure.Database;

namespace dotLearn.Infrastructure.FlashCards
{
    public class FlashCardsRepository : IFlashCardsRepository
    {
        private readonly DotLearnDbContext _context;
        public FlashCardsRepository(DotLearnDbContext context)
        {
            _context = context;
        }


        public void Create(FlashCard flashCard)
        {
            _context.FlashCards.Add(flashCard);
            _context.SaveChanges();
        }
    }   
}
