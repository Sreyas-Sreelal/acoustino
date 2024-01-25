import { Button, Card } from "antd";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined } from "@ant-design/icons";
import { appData } from '../data/app';
import CodeHighlighter from "../components/CodeHighlighter";

const CodeArea = ({ code }) => {
    return (
        <Card
            title={appData.codeareatitle}
            extra={
                <CopyToClipboard text={code} >
                    <Button type="link" icon={<CopyOutlined />}>{appData.copybuttontext}</Button>
                </CopyToClipboard>
            }
            bordered={false}
        >
            <CodeHighlighter code={code} />

        </Card>
    );
}

export default CodeArea;