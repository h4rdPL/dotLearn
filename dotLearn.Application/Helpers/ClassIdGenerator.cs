using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Application.Helpers
{
    public class CardIdGenerator
    {
        private static int _lastAssignedCardId = 0;

        public int GenerateCardId()
        {
            // Increment the last assigned CardId and return it
            _lastAssignedCardId++;
            return _lastAssignedCardId;
        }
        public int GenerateCardIdInt()
        {
            // Increment the last assigned CardId and return it
            _lastAssignedCardId++;
            return _lastAssignedCardId;
        }
    }

}
