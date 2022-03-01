import { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [upload, setUpload] = useState();
  const uploadData = async (data) => {
    try {
      const res = await axios.post('/', data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(upload);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', upload.selectedFile);
    uploadData(data);
  };
  return (
    <div className='App'>
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <input
          name='file'
          type='file'
          onChange={(e) => setUpload({ selectedFile: e.target.files[0] })}
        />
        <button type='submit' value='Sign in'>
          Sign in
        </button>
      </form>
    </div>
  );
}

export default App;
