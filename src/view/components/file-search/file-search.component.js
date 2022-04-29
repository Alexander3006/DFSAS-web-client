import './file-search.style.css';

function FileSearch() {
  return (
    <div id="file-search" className="flex-column-container">
      <div id="file-search-header">Search File</div>
      <div id="file-search-params" className="flex-row-container">
        <div>
          <label htmlFor="file-search-select-by-field">Search by:</label>
          <select id="file-search-select-by-field" onChange={(e) => console.dir(e)}>
            <option value="0">Hash</option>
            <option value="1" selected>
              Name
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="file-search-input-value">Value:</label>
          <input id="file-search-input-value" type="text"></input>
        </div>
        <div>
          <button>FIND</button>
        </div>
      </div>
      <div id="file-search-files" className="flex-column-container">
        {/* MOCK */}
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div>a1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </div>
  );
}

export default FileSearch;
