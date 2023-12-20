namespace dotLearn.Application.Helpers
{
    public class CardIdGenerator
    {
        private static int _lastAssignedCardId = 0;

        /// <summary>
        /// Generates a unique card ID.
        /// </summary>
        /// <returns>An integer representing the newly generated card ID.</returns>
        public int GenerateCardId()
        {
            _lastAssignedCardId++;
            return _lastAssignedCardId;
        }
        /// <summary>
        /// Generates a unique card ID as an integer.
        /// </summary>
        /// <returns>An integer representing the newly generated card ID.</returns>
        public int GenerateCardIdInt()
        {
            _lastAssignedCardId++;
            return _lastAssignedCardId;
        }
    }

}
