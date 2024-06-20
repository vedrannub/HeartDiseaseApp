using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HeartDisease.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialIdentitySetupSecond : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Predictions_AspNetUsers_DoctorId1",
                table: "Predictions");

            migrationBuilder.DropForeignKey(
                name: "FK_Predictions_AspNetUsers_PatientId1",
                table: "Predictions");

            migrationBuilder.DropIndex(
                name: "IX_Predictions_DoctorId1",
                table: "Predictions");

            migrationBuilder.DropIndex(
                name: "IX_Predictions_PatientId1",
                table: "Predictions");

            migrationBuilder.DropColumn(
                name: "DoctorId1",
                table: "Predictions");

            migrationBuilder.DropColumn(
                name: "PatientId1",
                table: "Predictions");

            migrationBuilder.AlterColumn<string>(
                name: "PatientId",
                table: "Predictions",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "DoctorId",
                table: "Predictions",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Predictions_DoctorId",
                table: "Predictions",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Predictions_PatientId",
                table: "Predictions",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Predictions_AspNetUsers_DoctorId",
                table: "Predictions",
                column: "DoctorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Predictions_AspNetUsers_PatientId",
                table: "Predictions",
                column: "PatientId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Predictions_AspNetUsers_DoctorId",
                table: "Predictions");

            migrationBuilder.DropForeignKey(
                name: "FK_Predictions_AspNetUsers_PatientId",
                table: "Predictions");

            migrationBuilder.DropIndex(
                name: "IX_Predictions_DoctorId",
                table: "Predictions");

            migrationBuilder.DropIndex(
                name: "IX_Predictions_PatientId",
                table: "Predictions");

            migrationBuilder.AlterColumn<int>(
                name: "PatientId",
                table: "Predictions",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<int>(
                name: "DoctorId",
                table: "Predictions",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "DoctorId1",
                table: "Predictions",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PatientId1",
                table: "Predictions",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Predictions_DoctorId1",
                table: "Predictions",
                column: "DoctorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Predictions_PatientId1",
                table: "Predictions",
                column: "PatientId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Predictions_AspNetUsers_DoctorId1",
                table: "Predictions",
                column: "DoctorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Predictions_AspNetUsers_PatientId1",
                table: "Predictions",
                column: "PatientId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
