import React, {useState, useEffect, createContext, useContext} from 'react'

import "./styles/common.css"
import NavBar from "./NavBar";
import FooterComp from "./FooterComp";

import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Spin } from 'antd';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { CurrentUserContext } from '../../App';
const { Header, Content } = Layout;

// export const CurrentUserContext = createContext();

export default function BasicLayout({selectedMenuKey, children}) {
  const { currentUser, loading } = useContext(CurrentUserContext);
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {loading ? <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}/></div> :
      <Layout className="basic-layout">
          <Header style={{ backgroundColor: "white" }}>
            <NavBar selectedMenuKey={selectedMenuKey} />
          </Header>
          <Content className="basic-content">
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem', flexDirection: 'column' }}>
              {children}
            </div>
          </Content>
        <FooterComp />
      </Layout>}
    </CurrentUserContext.Provider>
  )
}
