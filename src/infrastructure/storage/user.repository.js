import EE from 'events';
import {v4 as uuid} from 'uuid';
import {EVENTS} from '../../domain/models/event.model';
import {UserModel} from '../../domain/models/user.model';

export class UserRepository extends EE {
  constructor() {
    super();
    this.memory = {};
  }

  upsert(userModel) {
    if (!(userModel instanceof UserModel)) throw new Error('Invalid user model');
    const existUserModel = this.findOne();
    const newUserModel = UserModel.fromRaw(
      Object.assign(existUserModel, {...userModel, id: userModel.id ?? uuid()}),
    );
    this.memory = newUserModel;
    this.emit(EVENTS.UPDATE, [this.memory]);
    return newUserModel;
  }

  delete() {
    this.memory = {};
    this.emit(EVENTS.UPDATE, [this.memory]);
  }

  findOne() {
    return this.memory;
  }

  find() {
    return [this.memory];
  }
}
