import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
/* import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons'; */
import Home from './Home';
import User from './User';
import List from './List';
import Cart from './Cart';
import '../assets/css/main.css';
import Detail from './Detail';

function Main() {
  const { SubMenu } = Menu;
  const { Header, Content, Footer } = Layout;
  const [current, setCurrent] = useState();
  const handleClick = (e) => {
    console.log('click ', e);
    setCurrent({ current: e.key });
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src="./images/hjhlogo.jpg" alt="" style={{ width: '56px' }} />
        </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="home">
            <Link to="/main/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="list">
            <Link to="/main/list">列表</Link>
          </Menu.Item>
          <Menu.Item key="cart">
            <Link to="/main/cart">购物车</Link>
          </Menu.Item>
          <Menu.Item key="user">
            <Link to="/main/user">个人中心</Link>
          </Menu.Item>
          <SubMenu key="SubMenu" title="登录/注册">
            <Menu.Item key="setting:1">
              <Link to="/login">登录</Link>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Link to="/register">注册</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Route path="/main/home">
            <Home />
          </Route>
          <Route path="/main/cart">
            <Cart />
          </Route>
          <Route path="/main/list">
            <List />
          </Route>
          <Route path="/main/user">
            <User />
          </Route>
          <Route path="/main/detail/:id?">
            <Detail />
          </Route>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Main;
