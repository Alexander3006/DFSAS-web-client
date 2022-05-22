'use strict';

import * as crypto from 'crypto-js';

export class FileServiceError extends Error {}

export class FileService {
  constructor({httpApiClient, userRepository}) {
    this.httpApiClient = httpApiClient;
    this.userRepository = userRepository;
  }

  #fileStreamToIterator(fileStream) {
    const fileReader = fileStream.getReader();
    return {
      [Symbol.asyncIterator]: () => ({
        async next() {
          const {done, value} = await fileReader.read();
          return {done, value};
        },
      }),
    };
  }

  async getChecksum(fileStream) {
    try {
      const fileIterator = this.#fileStreamToIterator(fileStream);
      let hasher = crypto.algo.MD5.create();
      const decoder = new TextDecoder('utf-8');
      for await (const chunk of fileIterator) {
        const hex = decoder.decode(chunk.buffer);
        hasher.update(hex);
      }
      const hash = hasher.finalize().toString(crypto.enc.Base64url);
      return hash;
    } catch (err) {
      console.log(err);
      throw new FileServiceError('Get checksum error');
    }
  }

  //TODO: model and validation(http client)
  async uploadFile({name, ttl, checksum, metadata, accessType, file}) {
    const {userRepository, httpApiClient} = this;
    if (!file) throw new FileServiceError('Invalid file');
    try {
      const account = userRepository.findOne();
      if (!account) throw new FileServiceError('Account not found');
      const result = await httpApiClient.uploadFile({
        name,
        ttl,
        checksum,
        metadata,
        accessType,
        file,
        secret: account.privateKey,
      });
      return result;
    } catch (err) {
      if (err instanceof FileServiceError) throw err;
      console.log(err);
      throw new FileServiceError('Upload file error');
    }
  }
}
