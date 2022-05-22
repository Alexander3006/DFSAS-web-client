'use strict';

import {WS_EVENTS} from '../../infrastructure/node-client/ws-api.client';
import {FileModel} from '../models/file.model';

export class SearchServiceError extends Error {}

export class SearchService {
  constructor({wsApiService, fileRepository, userRepository}) {
    this.wsApiService = wsApiService;
    this.fileRepository = fileRepository;
    this.userRepository = userRepository;
  }

  #onFileFound(payload) {
    const {fileRepository} = this;
    try {
      const {file, node} = payload;
      const {name, hash, size} = file;
      const {http: url} = node;
      const fileModel = FileModel.fromRaw({name, hash, size, url});
      console.log(fileModel); //DEBUG
      fileRepository.upsert(fileModel);
      return this;
    } catch (err) {
      console.log(err);
      throw new SearchServiceError('On file found handler error');
    }
  }

  async searchFileByHash({hash}) {
    const {wsApiService, fileRepository, userRepository} = this;
    try {
      const account = userRepository.findOne();
      if (!account) throw new SearchServiceError('Account not found');
      fileRepository.delete();
      wsApiService.subscribe(WS_EVENTS.FILE_FOUND, this.#onFileFound);
      wsApiService.subscribe(WS_EVENTS.FILE_SEARCH_FINISHED, function onSearchFinish() {
        wsApiService.unsubscribe(WS_EVENTS.FILE_FOUND, this.#onFileFound);
        wsApiService.unsubscribe(WS_EVENTS.FILE_SEARCH_FINISHED, onSearchFinish);
      });
      await wsApiService.searchFileByHashRequest({hash, secret: account.privateKey});
    } catch (err) {
      if (err instanceof SearchServiceError) throw err;
      console.log(err);
      throw new SearchServiceError('Search file by hash error');
    }
  }
}
