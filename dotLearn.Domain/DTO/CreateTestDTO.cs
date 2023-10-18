namespace dotLearn.Domain.DTO
{
    public record struct CreateTestDTO(
        string? TestName,
        int Time,
        DateTime ActiveDate,
        int ClassId,
        List<QuestionDTO> Questions,
        UserTestDTO UserTestData
        );
}