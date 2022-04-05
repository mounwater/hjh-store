import React, { useState, useEffect } from 'react';
import { getUsers, modifyUsers, modifyPwd } from '../services/users';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Drawer, Form, Button, Col, Row, Input, Radio, message } from 'antd';
import {
  EditOutlined,
  WomanOutlined,
  ManOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { resetImg } from '../utils/tools';
import FileUpload from '../components/FileUpload';
import '../assets/css/users.css';
import { getToken } from '../utils/tools';
import { getUserAvatar } from '../store/actions/getUserAvatar';

function User() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [list, setList] = useState({});
  const [visible, setVisible] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [imageUrl, setImgUrl] = useState('');
  const [myForm] = Form.useForm();
  const [myPwdForm] = Form.useForm();
  const getData = async () => {
    const res = await getUsers();
    console.log(res);
    setList(res.data);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onPwdClose = () => {
    setPwdVisible(false);
  };
  useEffect(() => {
    if (!getToken()) {
      message.info('您还未登录！请登录后重试！');
      history.push('/login');
    } else {
      getData();
    }
  }, []);
  return (
    <div className="users">
      <h1
        style={{
          color: 'black',
          fontWeight: 'bold',
          paddingLeft: '68px',
          marginBottom: '30px',
        }}
      >
        欢迎来到{list.nickName}的个人中心！
        <span style={{ fontSize: '12px' }}>
          【{list.userName}】
          {list.gender === '男' ? <ManOutlined /> : <WomanOutlined />}
        </span>
      </h1>
      <div
        className="userInfo"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <img
          src={resetImg(list.avatar)}
          alt={list.nickName}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '3px solid #0000001f',
            marginLeft: '68px',
          }}
        />
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <div>
            <Row>
              <Col span={3}></Col>
              <Col span={5}>
                <span style={{ fontWeight: 'bold' }}>昵称：</span>
                {list.nickName}
              </Col>
              <Col span={3}></Col>
              <Col span={5}>
                <span style={{ fontWeight: 'bold' }}>年龄：</span>
                {list.age}
              </Col>
              <Col span={3}></Col>
              <Col span={5}>
                <span style={{ fontWeight: 'bold' }}>破壳日：</span>
                {list.birthday}
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: '26px' }}>
            <Row>
              <Col span={3}></Col>
              <Col span={5}>
                <span style={{ fontWeight: 'bold' }}>积分：</span>
                {list.score}
              </Col>
              <Col span={3}></Col>
              <Col span={5}>
                <span style={{ fontWeight: 'bold' }}>楼栋：</span>
                {list.area}
              </Col>
              <Col span={3}></Col>
              <Col span={5}>
                <span style={{ fontWeight: 'bold' }}>详细地址：</span>
                {list.address}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <hr
        style={{ backgroundColor: '#d7d7d76b', height: '2px', border: 'none' }}
      />
      <Row>
        <Col span={10}></Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => {
              showDrawer();
              setImgUrl(list.avatar);
              myForm.setFieldsValue({
                userName: list.userName,
                nickName: list.nickName,
                age: list.age,
                area: list.area,
                address: list.address,
                birthday: list.birthday,
                gender: list.gender,
              });
            }}
            style={{ width: '100%' }}
          >
            <EditOutlined /> 修改个人信息
          </Button>
          <Button
            onClick={() => {
              setPwdVisible(true);
              myPwdForm.setFieldsValue({
                oldPassword: list.password,
              });
            }}
          >
            <LockOutlined />
            修改密码
          </Button>
        </Col>
        <Col span={10}></Col>
      </Row>
      <Drawer
        title="修改您的密码"
        width={720}
        onClose={() => onPwdClose()}
        visible={pwdVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onPwdClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button
              onClick={() => {
                onPwdClose();
                myPwdForm.submit();
              }}
              type="primary"
            >
              保存
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={myPwdForm}
          onFinish={async (values) => {
            const res = await modifyPwd({ ...values });
            // console.log(res);
            if (res.code === 1) {
              message.success(res.msg);
              history.push('/login');
              message.info('请重新登录！');
            } else {
              message.error(res.msg);
            }
          }}
        >
          <Form.Item
            label="旧密码"
            name="oldPassword"
            rules={[{ required: true, message: '旧密码不能为空！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[{ required: true, message: '新密码不能为空！' }]}
          >
            <Input type="password" placeholder="请输入您的新密码" />
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="修改您的信息"
        width={720}
        onClose={() => onClose()}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button
              onClick={() => {
                onClose();
                myForm.submit();
              }}
              type="primary"
            >
              保存
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={myForm}
          onFinish={async (values) => {
            const res = await modifyUsers({ ...values, avatar: imageUrl });
            // console.log(res);
            if (res.code === 1) {
              message.success(res.msg);
              getData();
              dispatch(getUserAvatar());
            } else {
              message.error(res.msg);
            }
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nickName"
                label="昵称"
                rules={[{ required: true, message: '请输入您的昵称' }]}
              >
                <Input placeholder="请输入您的昵称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="性别"
                rules={[{ required: true, message: '请选择您的性别' }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    // console.log(e.target.value);
                    setGender(e.target.value);
                  }}
                  value={gender}
                >
                  <Radio value={'男'}>男</Radio>
                  <Radio value={'女'}>女</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label="生日"
                rules={[{ required: true, message: '请输入您的生日' }]}
              >
                <Input placeholder="请输入您的生日" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="年龄"
                rules={[{ required: true, message: '请输入您的年龄' }]}
              >
                <Input placeholder="请输入您的年龄" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="area"
                label="楼栋信息"
                rules={[{ required: true, message: '请输入您的楼栋信息' }]}
              >
                <Input placeholder="请输入您的楼栋信息" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="详细地址"
                rules={[{ required: true, message: '请输入您的详细地址' }]}
              >
                <Input placeholder="请输入您的详细地址" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="avatar" label="头像">
                <FileUpload imageUrl={imageUrl} setImgUrl={setImgUrl} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {/*  <Checkbox value="D" checked={true}>
        D
      </Checkbox> */}
    </div>
  );
}

export default User;
