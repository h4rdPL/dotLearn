namespace dotLearn.Infrastructure.Test
{
    public static class CalculateGrade
    {
        public static int GradeCalculator(double score)
        {
            if (score >= 0.9)
                return 5;
            else if (score >= 0.8)
                return 4;
            else if (score >= 0.7)
                return 3;
            else if (score >= 0.6)
                return 2;
            else
                return 1;
        }

    }
}
