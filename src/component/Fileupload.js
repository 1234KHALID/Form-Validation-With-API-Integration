import React from 'react'
import React, { useState } from "react";
function Fileupload() {
  const [fileType, setFileType] = useState([{ fileName: '', fileType: "", file: "" }]);

  useS
  return (
    <>
      <div>
        <h1>Upload Documents</h1>
      </div>
      <div className="box">
        <div>
          <div>
            <label>File Name</label>
            <span>*</span>
          </div>
          <input
            type="text"
            value={values.fileName}
            onChange={changeHandler}
            required
          />
        </div>
        <div>
          <div>
            <label>Type of file</label>
            <span>*</span>
          </div>
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            required
          >
            <option>pdf</option>
            <option>jpg</option>
            <option>jpeg</option>
            <option>png</option>
          </select>
        </div>
        <div>
          <div>
            <label>Upload Document</label>
            <span>*</span>
          </div>
          <input
            type="file"
            onChange={(e) => setSelectFile(e.target.files[0])}
            required
          />
        </div>
        <div>
          <button className="bg-slate-400 h-10 w-10" onClick={(e) => {
            e.preventDefault(); setManyFile(manyFile.filter((e, index) => index != i));
          }} >-</button>
        </div>
      </div>
    </>
  )
}

export default Fileupload