import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";
import { Col, Divider, Row } from "antd";

import CodeArea from "./container/CodeArea";
import Header from "./container/Header";
import Prepare from "./container/Prepare";
import { appData } from "./data/app";

function App() {
  const [output, setOutput] = useState("");
  const [pin, setPin] = useState(11);

  async function onChooseFile(event) {
    let filepath = await open()
    setOutput(await invoke("convert", { file: filepath, pin }));
  }

  return (
    <>
      <Row >
        <Col span={24}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CodeArea code={output} />
        </Col>
      </Row>
      <Divider>
        {appData.optionsectiontitle}
      </Divider>
      <Row>
        <Col span={24}>
          <Prepare ChooseFileHandler={onChooseFile} setPin={setPin} pin={pin} />
        </Col>
      </Row>
    </>
  );
}

export default App;
