import React from 'react'

import "../common/styles/common.css"

import { Layout, Typography, Button, Card, Tabs, Form } from 'antd';
import logo from '../../bell-ring.png';
import SignupForm from '../common/SignupForm';
import SigninForm from '../common/SigninForm';

const { Content } = Layout;
const {Text, Title} = Typography;

const tabs = [
  {key: 'signup', tab: 'Sign up'},
  {key: 'login', tab: 'Log in'},
];

export default function AuthPage() {
  return (
    <Layout className="basic-layout">
      <Content className="basic-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
          <div>
            <img src={logo} height={32} width={32} style={{ marginTop: -10}} />
            <span style={{ marginLeft: '0.25rem', fontSize: 16, fontWeight: 700, marginBottom: 5 }}>Ringabell</span>
          </div>
          <div style={{ marginTop: '2rem', minWidth: '40rem' }}>
            <Tabs tabPosition='left'>
              <Tabs.TabPane tab="Log in" key='login'>
                <SigninForm />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Sign up" key="signup">
                <SignupForm />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </Content>
    </Layout>
  )
}
