import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
// import '../assets/css/login.css';
import { usersLogin } from '../services/login';
import { setToken } from '../utils/tools';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {
  const history = useHistory();
  const onFinish = async (values) => {
    const res = await usersLogin(values);
    // console.log(res);
    if (res.code === 1) {
      message.success('登录成功！');
      setToken(res.data);
      history.push('/main/home');
    } else {
      message.error(res.data);
    }
  };

  /* const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; */
  return (
    <div
      className="input"
      style={{
        width: '500px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-112px',
        marginLeft: '0px',
      }}
    >
      <div
        className="logo"
        style={{
          width: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          top: '-15px',
          left: '-600px',
          fontFamily: '华文新魏',
        }}
      >
        <img
          src="./images/hjhlogo.png"
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/main/home')}
        />
        <h1>带给您不一样的购物体验</h1>
      </div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        style={{ width: '500px', display: 'block' }}
      >
        <h1 style={{ textAlign: 'center' }}>合家用户登录</h1>
        <Form.Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密　码"
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password />
        </Form.Item>

        {/*  <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
        <Link to="/register">还没账号？前往注册&gt;</Link>
      </Form>
    </div>
  );
}

export default Login;
