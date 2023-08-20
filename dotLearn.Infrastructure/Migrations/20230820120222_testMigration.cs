using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotLearn.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class testMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Benefits_Jobs_JobId",
                table: "Benefits");

            migrationBuilder.DropForeignKey(
                name: "FK_Expectations_Jobs_JobId",
                table: "Expectations");

            migrationBuilder.DropForeignKey(
                name: "FK_Offer_Jobs_JobId",
                table: "Offer");

            migrationBuilder.DropTable(
                name: "FlashCardStudent");

            migrationBuilder.DropColumn(
                name: "Guid",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Guid",
                table: "Professors");

            migrationBuilder.AddColumn<int>(
                name: "FlashCardId",
                table: "Students",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "JobId",
                table: "Offer",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "JobId",
                table: "Expectations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "JobId",
                table: "Benefits",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Students_FlashCardId",
                table: "Students",
                column: "FlashCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_Benefits_Jobs_JobId",
                table: "Benefits",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Expectations_Jobs_JobId",
                table: "Expectations",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Offer_Jobs_JobId",
                table: "Offer",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_FlashCards_FlashCardId",
                table: "Students",
                column: "FlashCardId",
                principalTable: "FlashCards",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Benefits_Jobs_JobId",
                table: "Benefits");

            migrationBuilder.DropForeignKey(
                name: "FK_Expectations_Jobs_JobId",
                table: "Expectations");

            migrationBuilder.DropForeignKey(
                name: "FK_Offer_Jobs_JobId",
                table: "Offer");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_FlashCards_FlashCardId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_FlashCardId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "FlashCardId",
                table: "Students");

            migrationBuilder.AddColumn<Guid>(
                name: "Guid",
                table: "Students",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Guid",
                table: "Professors",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<int>(
                name: "JobId",
                table: "Offer",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "JobId",
                table: "Expectations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "JobId",
                table: "Benefits",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "FlashCardStudent",
                columns: table => new
                {
                    FlashCardsId = table.Column<int>(type: "int", nullable: false),
                    StudentsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlashCardStudent", x => new { x.FlashCardsId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_FlashCardStudent_FlashCards_FlashCardsId",
                        column: x => x.FlashCardsId,
                        principalTable: "FlashCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FlashCardStudent_Students_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlashCardStudent_StudentsId",
                table: "FlashCardStudent",
                column: "StudentsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Benefits_Jobs_JobId",
                table: "Benefits",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expectations_Jobs_JobId",
                table: "Expectations",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offer_Jobs_JobId",
                table: "Offer",
                column: "JobId",
                principalTable: "Jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
