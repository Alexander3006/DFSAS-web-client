'use strict';

export class HttpApiClientError extends Error {}

const DEFAULT_ENDPOINT = 'http://localhost:5001';

export class HttpApiClient {
  constructor({signatureService}) {
    this.signatureService = signatureService;
    this.endpoint = DEFAULT_ENDPOINT;
  }

  setEndpoint(endpoint) {
    this.endpoint = endpoint;
    return this;
  }

  async uploadFile({name, ttl, checksum, metadata = {}, accessType, file, secret}) {
    const {signatureService, endpoint} = this;
    try {
      const publicKey = await signatureService.getPublicKey(secret);
      const address = signatureService.publicKeyToAddress(publicKey);
      const nonce = await this.getNonce({publicKey});
      const message = `${name}:${checksum}:${nonce}`;
      const signature = await signatureService.signMessage(message, secret);
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'payload',
        JSON.stringify({
          signature: {signature, publicKey, nonce},
          data: {
            ttl,
            name,
            checksum,
            metadata,
            accessType,
            address,
          },
        }),
      );
      const result = await fetch(`${endpoint}/client/upload-file`, {
        method: 'POST',
        body: formData,
      });
      const {success, result: fileResult} = await result.json();
      if (!success) throw new HttpApiClientError('Unsuccess result: upload file');
      return fileResult;
    } catch (err) {
      if (err instanceof HttpApiClientError) throw err;
      console.log(err);
      throw new HttpApiClientError('Upload file error');
    }
  }

  async getNonce({publicKey}) {
    const {endpoint} = this;
    try {
      const data = {publicKey};
      const result = await fetch(`${endpoint}/client/get-temp-nonce`, {
        method: 'POST',
        body: JSON.stringify({data}),
      });
      const response = await result.json();
      if (!response?.success) throw new HttpApiClientError('Unsuccess result: get nonce');
      const {
        result: {nonce},
      } = response;
      return nonce;
    } catch (err) {
      if (err instanceof HttpApiClientError) throw err;
      console.log(err);
      throw new HttpApiClientError('Get nonce error');
    }
  }
}
