import { InputNumber, Typography } from "antd";
import { Space } from "antd";

const { Text } = Typography;

const NumberSelector = ({ label, min, max, onChangeHandler, value }) => {
    return (
        <Space>
            <Text style={{ fontWeight: "bold" }}>{label}</Text>
            <InputNumber min={min} max={max} onChange={onChangeHandler} value={value} />
        </Space>
    )
}

export default NumberSelector;