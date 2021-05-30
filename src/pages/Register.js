import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
import '../assets/css/register.css';
import { usersRegister } from '../services/login';
import FileUpload from '../components/FileUpload';
import { setToken } from '../utils/tools';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Register() {
  const [imageUrl, setImgUrl] = useState('');
  const [value, setValue] = useState(1);
  const history = useHistory();
  const onFinish = async (values) => {
    const res = await usersRegister({ ...values, avatar: imageUrl });
    // console.log(res);
    if (res.code === 1) {
      message.success('注册成功！');
      setToken(res.data);
      history.push('/main/home');
    } else {
      message.error(res.data);
    }
  };
  /* const onFinish = (values) => {
    console.log(values);
  }; */

  /* const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }; */
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="input">
      <div className="logo">
        <img
          src="./images/hjhlogo.png"
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={() => history.push('/main/home')}
        />
        <h1>带给您不一样的购物体验</h1>
      </div>
      <h1 style={{ textAlign: 'center' }}>合家用户注册</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <div className="left">
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

          <Form.Item
            label="生　日"
            name="birthday"
            // rules={[{ required: true, message: '请输入生日！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年　龄"
            name="age"
            // rules={[{ required: true, message: '请输入生日！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="头　像"
            // name="birthday"
            // rules={[{ required: true, message: '请输入生日！' }]}
          >
            <FileUpload imageUrl={imageUrl} setImgUrl={setImgUrl} />
          </Form.Item>
        </div>

        <div className="right">
          <Form.Item
            label="楼栋信息"
            name="area"
            // rules={[{ required: true, message: '请输入生日！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="详细地址"
            name="address"
            // rules={[{ required: true, message: '请输入生日！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="昵称"
            name="nickName"
            // rules={[{ required: true, message: '请输入生日！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="性别" name="gender">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          </Form.Item>

          {/*  <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
          <Link to="/login">已有账号？前往登录&gt;</Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
