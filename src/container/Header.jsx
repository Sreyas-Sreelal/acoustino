import { Typography } from "antd";
import { appData } from "../data/app";
const { Title } = Typography;

const Header = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Title>{appData.headertitle}</Title>
        </div>
    )
}

export default Header;