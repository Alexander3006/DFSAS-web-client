'use strict';

export const NodeStatuses = {
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
};

export class NodeModel {
  constructor(raw) {
    const {id, version, address, ip, http, ws, status} = raw;
    this.id = id;
    this.ip = ip;
    this.ws = ws;
    this.http = http;
    this.version = version;
    this.address = address;
    this.status = status;
  }

  static fromRaw(raw) {
    NodeModel.validate(raw);
    const model = new NodeModel(raw);
    return model;
  }

  static validate(raw) {
    const {version, address, ip, http, ws, status} = raw;
    return true;
  }
}
