import { Injectable } from "@nestjs/common";
import { Note } from "./notes.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateNoteDto } from "./dto/create-note-dto";
import { UpdateNoteDto } from "./dto/update-note-dto";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private notesRepository: typeof Note) {}

  async create(dto: CreateNoteDto) {
    const note = await this.notesRepository.create(dto);
    return note;
  }

  async getAll() {
    const notes = await this.notesRepository.findAll();
    return notes;
  }

  async stats() {
    const count = await this.notesRepository.count();
    return `{count: ${count}}`;
  }
  async getNoteByName(name: string) {
    const note = await this.notesRepository.findOne({ where: { name } });
    return note;
  }
  async getById(id: string) {
    return await this.notesRepository.findByPk(id);
  }

  async remove(id: string) {
    const removeNote = await this.notesRepository.findByPk(id);
    if (!removeNote) {
      return null;
    }
    removeNote.destroy();
    return removeNote;
  }
  async update(id, noteDto: UpdateNoteDto): Promise<Note> {
    const noteFound = await this.getById(id);
    if (!noteFound) {
      return null;
    }
    return noteFound.set(noteDto);
  }
}
