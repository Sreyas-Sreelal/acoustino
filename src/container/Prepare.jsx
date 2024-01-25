import { Space } from "antd";
import FileChooseButton from "../components/FileChooseButton";
import { appData } from "../data/app";
import NumberSelector from "../components/NumberSelector";

const Prepare = ({ ChooseFileHandler, setPin, pin }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <Space>
                <NumberSelector
                    label={appData.pinselectlabel}
                    min={appData.arduinominpin}
                    max={appData.arduinomaxpin}
                    onChangeHandler={setPin}
                    value={pin}
                />
                <FileChooseButton text={appData.choosefilebuttontext} handler={ChooseFileHandler} />
            </Space>
        </div>
    )
};

export default Prepare;
