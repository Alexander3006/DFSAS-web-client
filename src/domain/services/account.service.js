'use strict';

import {UserModel} from '../models/user.model';

export class AccountServiceError extends Error {}

export class AccountService {
  constructor({userRepository, signatureService}) {
    this.userRepository = userRepository;
    this.signatureService = signatureService;
  }

  async login({privateKey}) {
    const {userRepository, signatureService} = this;
    try {
      const publicKey = await signatureService.getPublicKey(privateKey);
      const address = signatureService.publicKeyToAddress(publicKey);
      const userModel = UserModel.fromRaw({
        address: address,
        publicKey: publicKey,
        privateKey: privateKey,
        balance: 0,
      });
      const user = userRepository.upsert(userModel);
      return user;
    } catch (err) {
      console.log(err);
      throw new AccountServiceError('Login user error');
    }
  }

  async signOut() {
    const {userRepository} = this;
    try {
      userRepository.delete();
      return true;
    } catch (err) {
      console.log(err);
      throw new AccountServiceError('Sign out user error');
    }
  }

  getUser() {
    const {userRepository} = this;
    try {
      const user = userRepository.findOne();
      return user;
    } catch (err) {
      console.log(err);
      throw new AccountServiceError('Get user error');
    }
  }
}
