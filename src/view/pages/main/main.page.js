import './main.style.css';

import UserPanel from '../../components/user-panel/user-panel.componetn';
import FileUpload from '../../components/file-upload/file-upload.component';
import FileSearch from '../../components/file-search/file-search.component';
import NodePanel from '../../components/node-panel/node-panel.component';
import {useContext, useEffect, useReducer} from 'react';
import ContainerContext from '../../contexts/container.context';
import UserContext from '../../contexts/user.context';
import {EVENTS} from '../../../domain/models/event.model';
import NodeContext from '../../contexts/node.context';
import FileContext from '../../contexts/file.context';

const userReducer = (state, action) => {
  const {type, value} = action;
  if (type === EVENTS.UPDATE) {
    return value[0];
  }
  return state;
};

const nodeReducer = (state, action) => {
  const {type, value} = action;
  if (type === EVENTS.UPDATE) {
    return value;
  }
  return state;
};

const fileReducer = (state, action) => {
  const {type, value} = action;
  if (type === EVENTS.UPDATE) {
    return value;
  }
  return state;
};

function MainPage() {
  const container = useContext(ContainerContext);
  //bindings
  //user context
  const [user, userDispatch] = useReducer(userReducer, {});
  //node context
  const [nodes, nodeDispatch] = useReducer(nodeReducer, []);
  //file context
  const [files, fileDispatch] = useReducer(fileReducer, []);
  useEffect(() => {
    const onUserUpdate = (value) => userDispatch({type: EVENTS.UPDATE, value});
    container.userRepository.on(EVENTS.UPDATE, onUserUpdate);
    const onNodeUpdate = (value) => nodeDispatch({type: EVENTS.UPDATE, value});
    container.nodeRepository.on(EVENTS.UPDATE, onNodeUpdate);
    const onFileUpdate = (value) => fileDispatch({type: EVENTS.UPDATE, value});
    container.fileRepository.on(EVENTS.UPDATE, onFileUpdate);
    return () => {
      container.userRepository.removeListener(EVENTS.UPDATE, onUserUpdate);
      container.nodeRepository.removeListener(EVENTS.UPDATE, onNodeUpdate);
      container.fileRepository.removeListener(EVENTS.UPDATE, onFileUpdate);
    };
  }, [container]);

  return (
    <div id="MainPage" className="flex-column-container">
      <div className="flex-row-container">
        <NodeContext.Provider value={nodes}>
          <NodePanel />
        </NodeContext.Provider>
        <UserContext.Provider value={user}>
          <UserPanel />
        </UserContext.Provider>
      </div>
      <div className="flex-row-container">
        <FileUpload />
        <FileContext.Provider value={files}>
          <FileSearch />
        </FileContext.Provider>
      </div>
    </div>
  );
}

export default MainPage;
