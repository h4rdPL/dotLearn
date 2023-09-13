using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace dotLearn.Domain.Entities
{
    public class Deck
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int StudentId { get; set; }
        public virtual List<FlashCard> FlashCards { get; set; }
    }
}
