import { useState } from "react";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";
import { Col, Divider, Modal, Row } from "antd";

import CodeArea from "./container/CodeArea";
import Header from "./container/Header";
import Prepare from "./container/Prepare";
import { appData } from "./data/app";
import { convert_file } from "./framework/conversion";

function App() {
  const [output, setOutput] = useState("");
  const [pin, setPin] = useState(11);
  const [errorMsg, setErrorMsg] = useState("", []);

  async function onChooseFile(event) {
    try {
      let filepath = await open({ filters: [{ name: '', extensions: ["xml", "mxl"] }] });
      if (filepath === null) {
        return;
      }
      let result = await convert_file(filepath, pin);
      setOutput(result);
    } catch (err) {
      setErrorMsg(err);
    }
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
        <Modal open={errorMsg !== ""} onOk={() => setErrorMsg("")} onCancel={() => setErrorMsg("")}>
          {errorMsg}
        </Modal>
        <Col span={24}>
          <Prepare ChooseFileHandler={onChooseFile} setPin={setPin} pin={pin} />
        </Col>
      </Row>
    </>
  );
}

export default App;
