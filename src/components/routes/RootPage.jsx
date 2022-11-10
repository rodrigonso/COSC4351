import React from 'react'
import "../common/styles/common.css"

import {Link} from 'react-router-dom';

import { Typography, Button } from 'antd';
import BasicLayout from '../common/BasicLayout';

const { Title, Paragraph, Text} = Typography;

export default function RootPage() {

  return (
    <BasicLayout>
      {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', flexDirection: 'column' }}> */}
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
      {/* </div> */}
    </BasicLayout>
  )
}
