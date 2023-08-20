﻿using dotLearn.Application.Common.Interfaces.FlashCards;
using dotLearn.Application.Services.Flashcards;
using dotLearn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Common.Services.Flashcards
{
    public class FlashcardsService : IFlashcardsService
    {
        private readonly IFlashCardsRepository _flashCardsRepository;
        public FlashcardsService(IFlashCardsRepository flashCardsRepository)
        {
            _flashCardsRepository = flashCardsRepository;
        }
        /// <summary>
        /// Creates a flash card
        /// </summary>
        /// <param name="flashCard">the flash card entity to be created.</param>
        /// <returns>new entity which will be created</returns>
        /// <exception cref="NotImplementedException"></exception>
        public void Create(FlashCard flashCard)
        {
            _flashCardsRepository.Create(flashCard);
            
        }
        /// <summary>
        /// Deletes a flash card.
        /// </summary>
        /// <param name="flashCard">The flash card entity to be deleted.</param>
        /// <returns>Returns true if the flash card was successfully deleted.</returns>
        /// <exception cref="NotImplementedException">Thrown to indicate that the method is not yet implemented.</exception>
        public bool Delete(FlashCard flashCard)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Updates a flash card.
        /// </summary>
        /// <param name="flashCard">The updated flash card entity.</param>
        /// <returns>Returns the updated flash card entity.</returns>
        /// <exception cref="NotImplementedException">Thrown to indicate that the method is not yet implemented.</exception>
        public FlashCard Update(FlashCard flashCard)
        {
            throw new NotImplementedException();
        }

    }
}