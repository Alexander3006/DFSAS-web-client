import {useContext, useState} from 'react';
import {FileAccessTypes} from '../../../domain/models/file.model';
import ContainerContext from '../../contexts/container.context';
import './file-upload.style.css';

function FileUpload() {
  const {fileService} = useContext(ContainerContext);

  const [file, setFile] = useState(null);
  const [checksum, setChecksum] = useState('');
  const [name, setName] = useState('');
  const [ttl, setTtl] = useState(0);
  const [metadata, setMetadata] = useState({});
  const [accessType, setAccessType] = useState(FileAccessTypes.OPEN);

  const onInputName = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setName(value);
  };

  const onInputTtl = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    setTtl(value);
  };

  const onInputMetadata = (event) => {
    event.preventDefault();
    // const value = event.target.value;
    // const metadata = JSON.parse(value);
    // setMetadata(metadata);
  };

  const onSelectAccessType = (event) => {
    event.preventDefault();
    const value = event.target.value;
    if (!Object.values(FileAccessTypes).includes(value)) return;
    setAccessType(value);
  };

  const onFileSelected = async (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    setFile(file);
    const fileStream = file.stream();
    const hash = await fileService.getChecksum(fileStream);
    setChecksum(hash);
  };

  const onUpload = async (event) => {
    event.preventDefault();
    const result = await fileService.uploadFile({name, ttl, checksum, metadata, accessType, file});
    console.dir({result}); //REMOVE
  };

  return (
    <div id="file-uploud" className="flex-column-container">
      <div id="file-upload-header" className="flex-column-container ">
        File Upload
      </div>
      <div className="flex-row-container">
        <label htmlFor="file-upload-input-name">Name: </label>
        <input id="file-upload-input-name" type="text" value={name} onChange={onInputName}></input>
      </div>
      <div className="flex-row-container">
        <label htmlFor="file-upload-input-ttl">TTL: </label>
        <input id="file-upload-input-ttl" type="number" value={ttl} onChange={onInputTtl}></input>
      </div>
      <div className="flex-row-container">
        <label htmlFor="file-upload-select-access-type">Select access type: </label>
        <select
          id="file-upload-select-access-type"
          onChange={onSelectAccessType}
          value={accessType}
        >
          {Object.values(FileAccessTypes).map((type) => (
            <option value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="flex-row-container">
        <label htmlFor="file-upload-input-file-metadata">Enter file metadata: </label>
        <textarea
          id="file-upload-input-file-metadata"
          rows="5"
          cols="33"
          value={JSON.stringify(metadata)}
          onChange={onInputMetadata}
        ></textarea>
      </div>
      <div className="flex-row-container">
        <label htmlFor="file-upload-input-file">Enter file : </label>
        <input id="file-upload-input-file" type="file" onChange={onFileSelected}></input>
      </div>
      <div className="flex-row-container">
        <label htmlFor="file-upload-checksum">Checksum: </label>
        <div id="file-upload-checksum">{checksum}</div>
      </div>
      {/* validate status */}
      <div className="flex-row-container">
        <label htmlFor="file-upload-status">Status: </label>
        <div id="file-upload-status">{'READY FOR UPLOAD'}</div>
      </div>
      <button onClick={onUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
