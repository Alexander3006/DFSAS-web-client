'use strict';

const crypto = require('crypto-js');
const ed25519 = require('@noble/ed25519');
const {uint8toHex, hexToUint8} = require('./helpers');

export class SignatureService {
  constructor() {}

  async generateKeyPair() {
    const privateKey = ed25519.utils.randomPrivateKey();
    const publicKey = await ed25519.getPublicKey(privateKey);
    return {
      privateKey: uint8toHex(privateKey),
      publicKey: uint8toHex(publicKey),
    };
  }

  publicKeyToAddress(publicKey) {
    const address = crypto.MD5(publicKey).toString(crypto.enc.Hex);
    return address;
  }

  async getPublicKey(privateKey) {
    const publicKey = await ed25519.getPublicKey(privateKey);
    return uint8toHex(publicKey);
  }

  async signMessage(message, privateKey) {
    const hexMessage = hexToUint8(message);
    const signature = await ed25519.sign(hexMessage, privateKey);
    return uint8toHex(signature);
  }

  async verify(message, signature, publicKey) {
    const hexMessage = Buffer.from(message).toString('hex');
    const verified = await ed25519.verify(signature, hexMessage, publicKey);
    return verified;
  }
}
