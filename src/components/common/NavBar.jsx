import React, { useState, useEffect, useContext } from 'react'
import { Menu, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import router, { getAuthRoute, getRootChildrenRoute } from "../../routeConfig";
import logo from "../../bell-ring.png";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CurrentUserContext } from '../../App';

const {Text} = Typography;

export default function NavBar({selectedMenuKey}) {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const isAuthRoute = (route) => route.path === "/auth";
  const isSuccessRoute = (route) => route.path === "/success";
  const getMenuItems = () => {
    if (router.routes.length === 0) return [];
    return router.routes;
  }


  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(res => console.log(res));
  }

  const handleSignUp = () => {
    navigate('/auth', { state: { operation: 'signup' } });
  }

  const handleSignIn = () => {
    navigate('/auth', { state: { operation: 'signin'} });
  }

  const renderUserAvatar = () => {
    if (currentUser) 
      return (
      <Menu mode="horizontal">
        <Menu.SubMenu title={`Hi, ${currentUser.name.split(' ')[0]}`}>
          <Menu.Item>
            Profile
          </Menu.Item>
          <Menu.Item  onClick={handleSignOut}>
            Sign out
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    else return (
      <>
        <Button onClick={handleSignIn} type="link">Sign in</Button>
        <Button onClick={handleSignUp} size="small" type="primary">Sign up</Button>
      </>
    )
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ flexGrow: 1 }}>
       <Link to="/">
        <img src={logo} height={32} width={32} style={{ marginTop: -10}} />
        <span style={{ marginLeft: '0.25rem', fontSize: 16, fontWeight: 700, marginBottom: 5, color: 'black' }}>Ringabell</span>
       </Link>
      </div>
      <div style={{ flexGrow: 4, display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginLeft: 40 }}>
          <Menu mode="horizontal" style={{ border: 0 }} selectedKeys={[selectedMenuKey]}>
              {getMenuItems().map(route => {
                if (!isAuthRoute(route) && !isSuccessRoute(route))
                  return (
                      <Menu.Item key={route.path}>
                          <Link key={route.path} to={route.path}>{route.name}</Link>
                      </Menu.Item>
                  )
              })}
          </Menu>
        </div>
      </div>
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5 }}>
        {renderUserAvatar()}
      </div>
    </div>
  )
}
