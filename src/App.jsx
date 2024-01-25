import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";

function App() {
  const [file, setFile] = useState("");
  const [output, setOutput] = useState("");
  const [pin, setPin] = useState(11);

  function onSelectPin(event) {
    setPin(parseInt(event.target.value));
  }

  async function onClickConvert(event) {
    let filepath = await open()
    setOutput(await invoke("convert", { file: filepath, pin }));
  }


  return (
    <div className="container">
      <h1>Acoustino</h1>
      <textarea value={output}>
      </textarea>
      <select onChange={onSelectPin} value={pin}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        <option>11</option>
      </select>
      <button onClick={onClickConvert}>
        Choose File to Convert
      </button>
    </div>
  );
}

export default App;
