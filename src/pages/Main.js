import React, { useState, useEffect } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Avatar, Dropdown, message } from 'antd';
import Home from './Home';
import User from './User';
import List from './List';
import Cart from './Cart';
import '../assets/css/main.css';
import Detail from './Detail';
import { getToken, removeToken } from '../utils/tools';
import { getCartCount } from '../store/actions/getCartCount';
import { getUserAvatar } from '../store/actions/getUserAvatar';

function Main() {
  const history = useHistory();
  const { SubMenu } = Menu;
  const { Header, Content, Footer } = Layout;
  const [logined, setLogined] = useState(false);
  const cartCount = useSelector((state) => state.userReducer.cartCount);
  const userAvatar = useSelector((state) => state.userReducer.userAvatar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getToken()) {
      dispatch(getCartCount());
      dispatch(getUserAvatar());
      setLogined(true);
    } else {
      setLogined(false);
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item
        danger
        key="id"
        onClick={async () => {
          await removeToken();
          dispatch({
            type: 'UPDATE_CARTCOUNT',
            payload: '',
          });
          message.success('退出成功！');
          history.push('/login');
        }}
      >
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex' }}>
        <div className="logo">
          <Link to="/main/home">
            <img src="./images/hjhlogo.jpg" alt="" style={{ width: '56px' }} />
          </Link>
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
            <i className="cartCount">{cartCount}</i>
          </Menu.Item>
          <Menu.Item key="user">
            <Link to="/main/user">个人中心</Link>
          </Menu.Item>
          {logined ? (
            <Dropdown overlay={menu} className="userAvatar">
              <div
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar src={userAvatar} />
              </div>
            </Dropdown>
          ) : (
            <SubMenu key="SubMenu" title="登录/注册">
              <Menu.Item key="setting:1">
                <Link to="/login">登录</Link>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <Link to="/register">注册</Link>
              </Menu.Item>
            </SubMenu>
          )}
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
        合家商城 ©2019 Created by Ant UED and 合家集团/合家零售专营有限公司.
      </Footer>
    </Layout>
  );
}

export default Main;
