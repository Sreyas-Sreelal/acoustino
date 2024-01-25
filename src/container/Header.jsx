import { Col, Row, Space, Typography } from "antd";
import { appData } from "../data/app";
const { Title } = Typography;
import '../App.css'
import Link from "antd/es/typography/Link"

const Header = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <Row>
                <Col span={24}>
                    <Space>
                        <Title style={{ fontFamily: "DarumadropOne", fontSize: "3em" }}>{appData.headertitle}</Title>
                        <img src="logo.png" width={100} height={100} />
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={24}>

                    <Link style={{color:"grey"}} href={appData.repositorylink}>{appData.repoLinkText}</Link>

                </Col>
            </Row>
        </div>
    )
}

export default Header;