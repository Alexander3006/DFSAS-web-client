'use strict';
// 545da4de1ca9e84f708eed7ac0383876a7833e94f809a7ffe0fb7545a40d3c5d
export class UserModel {
  constructor(raw) {
    const {id, address, publicKey, privateKey, balance} = raw;
    this.id = id;
    this.address = address;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.balance = balance;
  }

  static fromRaw(raw) {
    UserModel.validate(raw);
    const model = new UserModel(raw);
    return model;
  }

  static validate(raw) {
    const {address, publicKey, privateKey, balance} = raw;
    //TODO: validate
    return true;
  }
}
