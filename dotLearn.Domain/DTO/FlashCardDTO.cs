namespace dotLearn.Domain.DTO
{
    public record struct FlashCardDTO (
            int Id,
            string Content,
            string Definition
        );
}