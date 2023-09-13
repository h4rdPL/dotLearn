using dotLearn.Application.Common.Interfaces.FlashCards;
using dotLearn.Application.Services.Flashcards;
using dotLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dotLearn.Application.Common.Interfaces.Authentication;
using dotLearn.Application.Common.Interfaces.Persisence;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Web.Http.ModelBinding;
using dotLearn.Domain.DTO;

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
                // Get the JWT token from the "Authorization" header
                var jwtToken = _contextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);

                // Verify the JWT token
                var jwtSecurityToken = _jwtTokenGenerator.Verify(jwtToken);

                // Extract student ID from the token
                var studentIdClaim = jwtSecurityToken.Claims.First(c => c.Type == "email").Value;
                var userGetByEmail = _userRepository.ReturnIdOfUserByEmail(studentIdClaim.ToString());

                // Create a new Deck
                var deck = new Deck
                {
                    Name = model.Name,
                    Category = model.Category,
                    StudentId = userGetByEmail,
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
        public List<Deck> GetDecksByUserEmail()
        {
            var jwtToken = _contextAccessor.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);

            // Verify the JWT token
            var jwtSecurityToken = _jwtTokenGenerator.Verify(jwtToken);

            // Extract student ID from the token
            var studentIdClaim = jwtSecurityToken.Claims.First(c => c.Type == "email").Value;
            var userGetByEmail = _userRepository.ReturnIdOfUserByEmail(studentIdClaim.ToString());

            // Fetch the user by email to get their ID
            var decks = _flashCardsRepository.GetDecksByUserId(userGetByEmail);

            return decks;
        }


    }
}
