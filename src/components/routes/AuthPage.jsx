import React from 'react'

import "../common/styles/common.css"

import { Layout, Tabs } from 'antd';
import logo from '../../bell-ring.png';
import SignupForm from '../common/SignupForm';
import SigninForm from '../common/SigninForm';
import { useLocation } from 'react-router-dom';

const { Content } = Layout;

export default function AuthPage() {
  const { state } = useLocation();

  return (
    <Layout className="basic-layout">
      <Content className="basic-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
          <div>
            <img alt="logo" src={logo} height={32} width={32} style={{ marginTop: -10}} />
            <span style={{ marginLeft: '0.25rem', fontSize: 16, fontWeight: 700, marginBottom: 5 }}>Ringabell</span>
          </div>
          <div style={{ marginTop: '2rem', minWidth: '40rem' }}>
            <Tabs tabPosition='left' defaultActiveKey={state.operation}>
              <Tabs.TabPane tab="Log in" key='signin'>
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
