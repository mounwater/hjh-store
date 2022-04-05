import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadDetail } from '../services/products';
import { Button, InputNumber, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { resetImg, getToken } from '../utils/tools';
import { addCart } from '../services/cart';
import { getCartCount } from '../store/actions/getCartCount';

function Detail() {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState([]);
  const [count, setCount] = useState(1);
  // const [display, setDisplay] = useState(false);
  const location = useLocation();
  console.log(location);
  const params = useParams();
  console.log(Number(params.id));
  const getData = async () => {
    const res = await loadDetail(Number(params.id));
    console.log(res);
    setDetail(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="product">
        <h1 style={{ color: 'black' }}>{detail.name}</h1>
        <div
          className="productMore"
          style={{ display: 'flex', height: '440px' }}
        >
          <img
            src={resetImg(detail.coverImage)}
            alt={detail.name}
            style={{ width: '460px', height: '100%' }}
          />
          <div
            className="productRight"
            style={{
              height: '100%',
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              paddingLeft: '30px',
            }}
          >
            <h1 style={{ color: 'black', fontWeight: 'bold' }}>
              {detail.name}
              {detail.onSale ? (
                <span style={{ color: '#B7EB8F' }}>
                  <CheckCircleOutlined />
                  在售中
                </span>
              ) : (
                <span style={{ color: '#FFCCC7' }}>
                  <CloseCircleOutlined />
                  已下架
                </span>
              )}
            </h1>
            <p>
              价格：￥
              <i style={{ color: 'red', fontWeight: 'bold', fontSize: '36px' }}>
                {detail.price}
              </i>
            </p>
            <div>
              <span>购买数量：</span>
              <InputNumber
                min={1}
                max={100}
                defaultValue={1}
                onChange={(value) => {
                  setCount(value);
                  console.log(value);
                }}
              />
            </div>
            <p style={{ display: 'inline', textAlign: 'right' }}>
              {detail.onSale ? (
                <Button
                  style={{ background: '#2996FF', color: 'white' }}
                  onClick={async () => {
                    if (getToken()) {
                      const res = await addCart({
                        product: detail.id,
                        amount: count,
                        price: detail.price,
                      });
                      // console.log(res);
                      if (res.code === 1) {
                        message.success(res.msg);
                        dispatch(getCartCount());
                      } else {
                        message.error(res.msg);
                      }
                    } else {
                      message.info('您还未登录！请登录后重试！');
                    }
                  }}
                >
                  加入购物车
                </Button>
              ) : (
                <Button style={{ background: 'gray', color: 'white' }} disabled>
                  加入购物车
                </Button>
              )}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div
        dangerouslySetInnerHTML={{ __html: detail.content }}
        style={{ textAlign: 'center' }}
      ></div>
    </div>
  );
}

export default Detail;
