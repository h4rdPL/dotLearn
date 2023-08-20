using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Services.Authentication
{
    public class CardIdGenerator
    {
        private static int currentCardId = 0;

        public int GenerateCardId()
        {
            if (currentCardId >= 9999)
            {
                // Reset the counter when it reaches 9999
                currentCardId = 0;
            }

            // Increment the counter and return the new value
            return ++currentCardId;
        }
    }

}
