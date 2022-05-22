'use strict';

import {NodeModel, NodeStatuses} from '../models/node.model';

export class NodeServiceError extends Error {}

export class NodeService {
  constructor({nodeRepository, httpApiClient, wsApiClient}) {
    this.nodeRepository = nodeRepository;
    this.httpApiClient = httpApiClient;
    this.wsApiClient = wsApiClient;
  }

  async connect(node) {
    const {nodeRepository, httpApiClient, wsApiClient} = this;
    try {
      const current = nodeRepository.findOne({status: NodeStatuses.CONNECTED});
      if (!!current) nodeRepository.upsert({...current, status: NodeStatuses.DISCONNECTED});
      const nodeModel = NodeModel.fromRaw({...node, status: NodeStatuses.CONNECTED});
      httpApiClient.setEndpoint(nodeModel.http);
      wsApiClient.disconnect().connect(nodeModel.ws);
      nodeRepository.upsert(nodeModel);
      return nodeModel;
    } catch (err) {
      console.log(err);
      throw new NodeServiceError('Connect node error');
    }
  }
}
