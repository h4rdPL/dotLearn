using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class updatemigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassUser_Class_ClassId",
                table: "ClassUser");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassUser_Users_UserId",
                table: "ClassUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassUser",
                table: "ClassUser");

            migrationBuilder.DropIndex(
                name: "IX_ClassUser_ClassId",
                table: "ClassUser");

            migrationBuilder.RenameTable(
                name: "ClassUser",
                newName: "ClassUsers");

            migrationBuilder.RenameColumn(
                name: "Language",
                table: "Class",
                newName: "language");

            migrationBuilder.RenameIndex(
                name: "IX_ClassUser_UserId",
                table: "ClassUsers",
                newName: "IX_ClassUsers_UserId");

            migrationBuilder.AlterColumn<int>(
                name: "language",
                table: "Class",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ClassUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassUsers",
                table: "ClassUsers",
                columns: new[] { "ClassId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ClassUsers_Class_ClassId",
                table: "ClassUsers",
                column: "ClassId",
                principalTable: "Class",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassUsers_Users_UserId",
                table: "ClassUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassUsers_Class_ClassId",
                table: "ClassUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_ClassUsers_Users_UserId",
                table: "ClassUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ClassUsers",
                table: "ClassUsers");

            migrationBuilder.RenameTable(
                name: "ClassUsers",
                newName: "ClassUser");

            migrationBuilder.RenameColumn(
                name: "language",
                table: "Class",
                newName: "Language");

            migrationBuilder.RenameIndex(
                name: "IX_ClassUsers_UserId",
                table: "ClassUser",
                newName: "IX_ClassUser_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Language",
                table: "Class",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ClassUser",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ClassUser",
                table: "ClassUser",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ClassUser_ClassId",
                table: "ClassUser",
                column: "ClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassUser_Class_ClassId",
                table: "ClassUser",
                column: "ClassId",
                principalTable: "Class",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ClassUser_Users_UserId",
                table: "ClassUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
