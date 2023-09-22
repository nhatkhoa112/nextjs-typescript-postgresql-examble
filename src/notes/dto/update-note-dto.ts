import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsOptional } from "class-validator";

export class UpdateNoteDto {
  @ApiProperty({ example: "Book", description: "Note name" })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: "Task", description: "Note category" })
  @IsString()
  readonly category: string;

  @ApiProperty({ example: "Some description", description: "Note description" })
  @IsString()
  readonly content: string;

  @ApiProperty({ example: "true", description: "Note state" })
  @IsBoolean()
  readonly active: boolean;

  @ApiProperty({
    example: "24 January, 2022",
    description: "Note date, (default: creation date)",
  })
  @IsOptional()
  @IsString()
  readonly date?: string;
}
