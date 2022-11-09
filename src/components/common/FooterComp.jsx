import React from 'react'

import { Layout, Typography } from 'antd';
import logo from "../../bell-ring.png";

const { Footer } = Layout;
const { Text } = Typography;

export default function FooterComp() {
  return (
    <Footer style={{ backgroundColor: '#e6f7ff' }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 40}}>
				<div>
						<img src={logo} height={32} width={32} style={{ marginTop: -10}} />
						<span style={{ marginLeft: '0.25rem', fontSize: 16, fontWeight: 700 }}>Ringabell</span>
				</div>
				<div style={{ display: 'flex', gap: '8rem' }}>
						<div>
						<Text strong>QUICK LINKS</Text>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: '0.75rem' }}>
								<Text>Hey there</Text>
								<Text>Hey there</Text>
								<Text>Hey there</Text>
						</div>
					</div>
					<div>
							<Text strong>FAQ</Text>
							<div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: '0.75rem' }}>
							<Text>Hey there</Text>
							<Text>Hey there</Text>
							<Text>Hey there</Text>
							</div>
					</div>
				</div>
			</div>
    </Footer>
  )
}
