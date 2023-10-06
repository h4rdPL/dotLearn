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
            _lastAssignedCardId++;
            return _lastAssignedCardId;
        }
        public int GenerateCardIdInt()
        {
            _lastAssignedCardId++;
            return _lastAssignedCardId;
        }
    }

}
