using Backend.Data.Enums;

namespace Backend.Models.Dto
{
    public class ClassDTO
    {
        public string Name { get; set; }
        public string Subname { get; set; }
        public virtual Language language { get; set; }
        public string? ClassCode { get; set; }
    }


}
