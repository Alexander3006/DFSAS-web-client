'use strict';

export const FileAccessTypes = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  HIDDEN: 'HIDDEN',
};

export class FileModel {
  constructor(raw) {
    const {id, name, hash, size, url} = raw;
    this.id = id;
    this.url = url;
    this.name = name;
    this.hash = hash;
    this.size = size;
  }

  static fromRaw(raw) {
    FileModel.fromRaw(raw);
    const model = new FileModel(raw);
    return model;
  }

  static validate(raw) {
    const {name, hash, size, url} = raw;
    return true;
  }
}
