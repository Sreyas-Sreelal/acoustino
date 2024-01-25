import { FileAddOutlined } from "@ant-design/icons";
import { Button } from "antd";

const FileChooseButton = ({ text, handler }) => {
    return (
        <Button type="primary" icon={<FileAddOutlined />} onClick={handler}>
            {text}
        </Button>
    )
}

export default FileChooseButton;