import EE from 'events';
import {v4 as uuid} from 'uuid';
import {EVENTS} from '../../domain/models/event.model';
import {FileModel} from '../../domain/models/file.model';

export class FileRepository extends EE {
  constructor() {
    super();
    this.memory = new Map();
  }

  upsert(fileModel) {
    const {memory} = this;
    if (!(fileModel instanceof FileModel)) throw new Error('Invalid file model');
    const existFileModel = this.findOne(fileModel) ?? {};
    const newFileModel = FileModel.fromRaw(
      Object.assign(existFileModel, {...fileModel, id: fileModel.id ?? uuid()}),
    );
    memory.set(newFileModel.id, newFileModel);
    this.emit(EVENTS.UPDATE, [...memory.values()]);
    return newFileModel;
  }

  delete({id}) {
    const {memory} = this;
    !!id ? memory.delete(id) : memory.clear();
    this.emit(EVENTS.UPDATE, [...memory.values()]);
    return;
  }

  findOne({id}) {
    const {memory} = this;
    if (!!id) {
      const fileModel = memory.get(id);
      return fileModel;
    }
    return null;
  }

  find() {
    const {memory} = this;
    const fileModels = [...memory.values()];
    return fileModels;
  }
}
