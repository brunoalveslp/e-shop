using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ProductAditionalImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PicturesUrls",
                table: "ProductItemOrdered");

            migrationBuilder.RenameColumn(
                name: "PicturesUrls",
                table: "Products",
                newName: "AditionalPicturesUrls");

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl",
                table: "Products",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PictureUrl",
                table: "ProductItemOrdered",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PictureUrl",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PictureUrl",
                table: "ProductItemOrdered");

            migrationBuilder.RenameColumn(
                name: "AditionalPicturesUrls",
                table: "Products",
                newName: "PicturesUrls");

            migrationBuilder.AddColumn<List<string>>(
                name: "PicturesUrls",
                table: "ProductItemOrdered",
                type: "text[]",
                nullable: true);
        }
    }
}
