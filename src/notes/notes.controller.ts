import {
  NOTE_NOT_FOUND_ERROR,
  THE_NAME_ALREADY_EXISTS,
} from "./notes.constants";
import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  NotFoundException,
  HttpException,
  HttpStatus,
  Patch,
} from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note-dto";
import { NotesService } from "./notes.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Note } from "./notes.model";
import { UpdateNoteDto } from "./dto/update-note-dto";
import { FindIdParams } from "./dto/find-id-dto";

@ApiTags("Notes")
@Controller("notes")
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: "Count of notes" })
  @ApiResponse({ status: 200 })
  @Get("stats")
  async stats() {
    return this.notesService.stats();
  }
  @ApiOperation({ summary: "Create note" })
  @ApiResponse({ status: 201, type: Note })
  @Post()
  async create(@Body() noteDto: CreateNoteDto) {
    const candidate = await this.notesService.getNoteByName(noteDto.name);
    if (candidate) {
      throw new HttpException(THE_NAME_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
    return this.notesService.create(noteDto);
  }

  @ApiOperation({ summary: "Getting all notes" })
  @ApiResponse({ status: 200, type: [Note] })
  @Get()
  async getAll() {
    return this.notesService.getAll();
  }

  @ApiOperation({ summary: "Delete note by ID" })
  @ApiResponse({ status: 200, type: Note })
  @Delete(":id")
  async remove(@Param() params: FindIdParams): Promise<any> {
    const deleteNote = await this.notesService.remove(params.id);
    if (!deleteNote) {
      throw new NotFoundException(NOTE_NOT_FOUND_ERROR);
    }
    return deleteNote;
  }

  @ApiOperation({ summary: "Get note by ID" })
  @ApiResponse({ status: 200, type: Note })
  @Get(":id")
  async getOne(@Param() params: FindIdParams): Promise<Note> {
    const note = await this.notesService.getById(params.id);
    if (!note) {
      throw new NotFoundException(NOTE_NOT_FOUND_ERROR);
    }
    return note;
  }

  @ApiOperation({ summary: "Update note by ID" })
  @ApiResponse({ status: 200, type: Note })
  @Patch(":id")
  async update(
    @Body() updateNoteDto: UpdateNoteDto,
    @Param() params: FindIdParams
  ) {
    const updateNote = await this.notesService.update(params.id, updateNoteDto);
    if (!updateNote) {
      throw new NotFoundException(NOTE_NOT_FOUND_ERROR);
    }
    const candidate = await this.notesService.getNoteByName(updateNoteDto.name);
    if (candidate && candidate.id !== updateNote.id) {
      throw new HttpException(THE_NAME_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
    return updateNote;
  }
}
