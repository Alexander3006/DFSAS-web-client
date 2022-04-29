import EE from 'events';
import {v4 as uuid} from 'uuid';
import {EVENTS} from '../../domain/models/event.model';
import {NodeModel} from '../../domain/models/node.model';

export class NodeRepository extends EE {
  constructor() {
    super();
    this.memory = new Map();
  }

  upsert(nodeModel) {
    const {memory} = this;
    if (!(nodeModel instanceof NodeModel)) throw new Error('Invalid node model');
    const existNodeModel = this.findOne(nodeModel) ?? {};
    const newNodeModel = NodeModel.fromRaw(
      Object.assign(existNodeModel, {...nodeModel, id: nodeModel.id ?? uuid()}),
    );
    memory.set(newNodeModel.id, newNodeModel);
    this.emit(EVENTS.UPDATE, [...memory.values()]);
    return newNodeModel;
  }

  findOne({id, status}) {
    const nodeModels = this.find({id, status});
    return nodeModels[0];
  }

  find({id, status}) {
    const {memory} = this;
    const nodes = [...memory.values()];
    if (!!status) {
      const nodeModels = nodes.filter((node) => node?.status === status);
      return nodeModels;
    }
    if (!!id) {
      return [memory.get(id)];
    }
    return [...memory.values()];
  }

  delete({id}) {
    const {memory} = this;
    !!id ? memory.delete(id) : memory.clear();
    this.emit(EVENTS.UPDATE, [...memory.values()]);
    return;
  }
}
