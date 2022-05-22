'use strict';
import {FileRepository} from '../infrastructure/storage/file.repository';
import {NodeRepository} from '../infrastructure/storage/node.repository';
import {UserRepository} from '../infrastructure/storage/user.repository';

import {SignatureService} from '../infrastructure/crypto/signature.service';

import {HttpApiClient} from '../infrastructure/node-client/http-api.client';
import {WsApiClient} from '../infrastructure/node-client/ws-api.client';

import {AccountService} from '../domain/services/account.service';
import {FileService} from './services/file.service';

//Data storage
const fileRepository = new FileRepository();
const nodeRepository = new NodeRepository();
const userRepository = new UserRepository();

//Common services
const signatureService = new SignatureService();

//api
const httpApiClient = new HttpApiClient({signatureService});
const wsApiClient = new WsApiClient({signatureService, httpApiClient});

//Domain dervices
const accountService = new AccountService({userRepository, signatureService});
const fileService = new FileService({httpApiClient, userRepository});

export const container = {
  fileRepository,
  nodeRepository,
  userRepository,

  signatureService,

  httpApiClient,
  wsApiClient,

  accountService,
  fileService,
};
