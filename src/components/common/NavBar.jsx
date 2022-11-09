import { Menu, Button } from 'antd';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

import router, { getAuthRoute, getRootChildrenRoute } from "../../routeConfig";
import logo from "../../bell-ring.png";

export default function NavBar() {
  const isAuthRoute = (route) => route.path === "/auth";
  const getMenuItems = () => {
    if (router.routes.length === 0) return [];
    return router.routes;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ flexGrow: 1 }}>
       <img src={logo} height={32} width={32} style={{ marginTop: -10}} />
       <span style={{ marginLeft: '0.25rem', fontSize: 16, fontWeight: 700 }}>Ringabell</span>
      </div>
      <div style={{ flexGrow: 4, display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginLeft: 40 }}>
          <Menu mode="horizontal" style={{ border: 0 }}>
              {getMenuItems().map(route => {
                if (!isAuthRoute(route))
                  return (
                      <Menu.Item key={route.path}>
                          <Link key={route.path} to={route.path}>{route.name}</Link>
                      </Menu.Item>
                  )
              })}
          </Menu>
        </div>
      </div>
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Link to={getAuthRoute().path}>{getAuthRoute().name}</Link>
        <Button size="small" style={{ marginLeft: '1rem' }} type="primary"><Link to={getAuthRoute().path}>Sign up</Link></Button>
      </div>
    </div>
  )
}
