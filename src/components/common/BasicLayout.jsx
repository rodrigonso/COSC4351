import React, {useState, useEffect, createContext} from 'react'

import "./styles/common.css"
import NavBar from "./NavBar";
import FooterComp from "./FooterComp";

import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Spin } from 'antd';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
const { Header, Content } = Layout;

export const CurrentUserContext = createContext();

export default function BasicLayout({selectedMenuKey, children}) {
const [loading, setLoading] = useState(true);
const [authState, setAuthState] = useState(false);
const [currentUser, setCurrentUser] = useState(undefined);

useEffect(() => {
  const auth = getAuth();
  const db = getFirestore();  

  setLoading(true);
  onAuthStateChanged(auth, async user => {
    if (user) {
      setAuthState(true);
      const snap = await getDoc(doc(db, 'users', user.uid));
      setCurrentUser(snap.data());
    } else {
      setAuthState(false);
      setCurrentUser(undefined);
    }
  });

  setLoading(false);
}, []);

console.log(loading);
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
