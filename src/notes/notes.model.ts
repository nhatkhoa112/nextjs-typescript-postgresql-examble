import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface NoteCreationAttrs {
  name: string;
  category: string;
  content: string;
  active: boolean;
  date?: string;
}

@Table({ tableName: "notes" })
export class Note extends Model<Note, NoteCreationAttrs> {
  @ApiProperty({ example: "1", description: "Unique id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Book", description: "Note name" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: "Task", description: "Note category" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @ApiProperty({ example: "Some description", description: "Note description" })
  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  content: string;

  @ApiProperty({ example: "true", description: "Note state" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  active: boolean;

  @ApiProperty({
    example: "24 January, 2022",
    description: "Note date, (default: creation date)",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
  })
  date: string;
}
