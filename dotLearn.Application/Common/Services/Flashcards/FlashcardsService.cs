﻿using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.FlashCards;
using dotLearn.Application.Common.Interfaces.Persisence;
using dotLearn.Application.Services.Flashcards;
using dotLearn.Domain.DTO;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace dotLearn.Application.Common.Services.Flashcards
{
    public class FlashcardsService : IFlashcardsService
    {
        private readonly IFlashCardsRepository _flashCardsRepository;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserRepository _userRepository;
        private readonly IHttpContextAccessor _contextAccessor;

        public FlashcardsService(IFlashCardsRepository flashCardsRepository, IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository, IHttpContextAccessor contextAccessor)
        {
            _flashCardsRepository = flashCardsRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
            _userRepository = userRepository;
            _contextAccessor = contextAccessor;
        }

        /// <summary>
        /// Creates a flash card
        /// </summary>
        /// <param name="flashCard">the flash card entity to be created.</param>
        /// <returns>new entity which will be created</returns>
        /// <exception cref="NotImplementedException"></exception>
        public void Create(DeckDTO model)
        {
            try
            {
                var jwtToken = _contextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);

                var jwtSecurityToken = _jwtTokenGenerator.Verify(jwtToken);

                var studentIdClaim = jwtSecurityToken.Claims.First(c => c.Type == "email").Value;
                var userGetByEmail = _userRepository.ReturnIdOfUserByEmail(studentIdClaim.ToString());

                var deck = new Deck
                {
                    Name = model.Name,
                    Category = model.Category,
                    StudentId = userGetByEmail.Id,
                    FlashCards = model.flashCards.Select(card => new FlashCard
                    {
                        Content = card.Content,
                        Definition = card.Definition
                    }).ToList()
                };
                _flashCardsRepository.Create(deck);
            }
            catch (Exception ex)
            {
                throw new Exception($"Wystąpił błąd podczas zapisu do bazy danych. {ex}");
            }
        }

        /// <summary>
        /// Deletes a flash card.
        /// </summary>
        /// <param name="flashCard">The flash card entity to be deleted.</param>
        /// <returns>Returns true if the flash card was successfully deleted.</returns>
        /// <exception cref="NotImplementedException">Thrown to indicate that the method is not yet implemented.</exception>
        public bool Delete(int deckId)
        {
            _flashCardsRepository.Delete(deckId);
            return true;
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email">User email</param>
        public List<DeckDTO> GetDecksByUserEmail()
        {
            var jwtToken = _contextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);

            var jwtSecurityToken = _jwtTokenGenerator.Verify(jwtToken);

            var studentIdClaim = jwtSecurityToken.Claims.First(c => c.Type == "email").Value;
            var userGetByEmail = _userRepository.ReturnIdOfUserByEmail(studentIdClaim.ToString());

            var decks = _flashCardsRepository.GetDecksByUserId(userGetByEmail.Id);

            return decks;
        }
    }
}
