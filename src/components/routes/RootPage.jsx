import React from 'react'
import "./RootPage.css"

import NavBar from "../common/NavBar";
import FooterComp from "../common/FooterComp";

import {Link} from 'react-router-dom';

import { Layout, Typography, Button } from 'antd';
import { getAuthRoute } from '../../routeConfig';

const { Header, Sider, Content } = Layout;
const { Title, Paragraph, Text} = Typography;

export default function RootPage() {

  return (
    <Layout className="basic-layout">
      <Header style={{ backgroundColor: "white" }}>
        <NavBar />
      </Header>
      <Content className="basic-content">
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>
              <Title strong style={{ fontSize: 60 }}>Easily find tables</Title>
            </div>
            <div>
              <Title strong style={{ fontSize: 60, color: '#1890ff', marginBlockStart: "-30px" }}>to your favorite places</Title>
            </div>
          </div>
          <div style={{display: 'block', marginInlineStart: 0, marginInlineEnd: 0, textAlign: 'center', marginBlockEnd: '2rem', fontSize: 18 }}>
            <Text>This is just a placeholder text for this section, we should change this later on once we land on a concise phrase</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button size="large" type="primary" style={{ width: 200, height: 50 }}><Link to="/reserve">Reserve</Link></Button>
          </div>
        </div>
      </Content>
      <FooterComp />
    </Layout>
  )
}
