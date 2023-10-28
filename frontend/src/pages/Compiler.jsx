import React, { useEffect, useState } from 'react';
// import '../../App.css'

import axios from 'axios';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";

function Compiler() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('py');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('python')
  
    const handleCompile = () => {
  
      axios.post('/api/compile', {      // Added proxy in 'vite.config.js
        code: code,
        language: language,
        input: input
      })
        .then((response) => {
          console.log(response.data);
          setOutput(response.data.output);
          setError(response.data.error);
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  
    useEffect(() => {
      switch (language) {
        case "c":
          setMode('java');
          break;
        case "cpp":
          setMode('java');
          break;
        case "py":
          setMode('python');
          break;
        case "java":
          setMode('java');
          break;
        case "cs":
          setMode('csharp');
          break;
        default:
          setMode('python');
          break;
      }
    }, [language])
  
  return (
    
    <div >
      <h1 className='text-center text-2xl font-bold '>Code Compiler</h1>
      <div className='flex justify-between mx-10 mb-8 mt-2'>
        <div >
          <AceEditor
            mode={mode}
            theme='dracula'
            height='500px'
            width='800px'
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              fontSize: 20,
              showPrintMargin: false,
            }}
            onChange={(e) => setCode(e)}
          />
        </div>
        <div>
          <select onChange={(e) => setLanguage(e.target.value)} name='language'>
            <option value="py">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="cs">C#</option>
            <option value="java">Java</option>
            <option value="js">Javascript</option>
            <option value="go">Golang</option>
          </select>

          <button onClick={handleCompile}>Compile</button><br />

          <label htmlFor='code-input'>Input </label>
          <textarea
            id='code-input'
            type='text'
            placeholder='Enter Input if required'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <div>
            <h2>Output:</h2>
            <pre>{output}</pre>
          </div>
          <div>
            <h2>Error:</h2>
            <pre>{error}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Compiler;