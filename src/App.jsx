import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { open } from "@tauri-apps/api/dialog";
import { Button, Col, Divider, InputNumber, Row, Select, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FileAddOutlined } from "@ant-design/icons";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { arduinoLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function App() {
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
    <>
      <Row>

        <Col span={24}>
          <div style={{ textAlign: "center" }}>
            <Typography.Title>Acoustino</Typography.Title>
          </div>
        </Col>
      </Row>
      {/* <Divider /> */}
      <Row>
        <Col span={24}>
          <Typography.Title level={5}>Generated Code</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SyntaxHighlighter
            language="c"
            style={arduinoLight}
            customStyle={{ height: 200, maxHeight: 200, minHeight: 200, overflowY: scroll, width: "100%" }}
            lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
            wrapLines  >
            {output}
          </SyntaxHighlighter>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <div style={{ textAlign: "center" }}>
            <Space>
              <Typography.Text>Pin no: </Typography.Text>
              <InputNumber min={1} max={11} onChange={setPin} value={pin} />
              <Button type="primary" icon={<FileAddOutlined />} onClick={onClickConvert}>
                Choose File to Convert
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default App;
