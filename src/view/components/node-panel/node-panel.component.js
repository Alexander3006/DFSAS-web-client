import './node-panel.style.css';

function NodePanel() {
  return (
    <div id="node-panel" className="flex-column-container">
      <div id="file-search-header">Connected node</div>
      <div>
        <p>Version: 0.0.1</p>
      </div>
      <div>
        <p>Address: address_address_address_address_address</p>
      </div>
      <div>
        <p>IP: 127.0.0.1</p>
      </div>
      <div>
        <p>Status: CONNECT OK</p>
      </div>
    </div>
  );
}

export default NodePanel;
