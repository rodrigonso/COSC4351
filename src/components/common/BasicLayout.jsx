import React from 'react'

import "./styles/common.css"

import NavBar from "./NavBar";
import FooterComp from "./FooterComp";

import { Layout } from 'antd';

const { Header, Content } = Layout;

export default function BasicLayout({children}) {
  return (
    <Layout className="basic-layout">
        <Header style={{ backgroundColor: "white" }}>
        	<NavBar />
        </Header>
        <Content className="basic-content">
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', flexDirection: 'column' }}>
						{children}
					</div>
				</Content>
			<FooterComp />
    </Layout>
  )
}
