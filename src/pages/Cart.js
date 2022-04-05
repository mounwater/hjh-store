import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Table, Input, Button, Popconfirm, message } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { resetImg, getToken } from '../utils/tools';
import { getCart, addCart, delCart } from '../services/cart';
import { getCartCount } from '../store/actions/getCartCount';

function Cart() {
  const history = useHistory();
  const [list, setList] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [delList, setDelList] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const [selectList, setSelectList] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    const res = await getCart();
    console.log(res);
    setList(res.data);
  };

  useEffect(() => {
    if (!getToken()) {
      message.info('您还未登录！请登录后重试！');
      history.push('/login');
    } else {
      getData();
    }
  }, []);

  const columns = [
    {
      title: '序号',
      align: 'center',
      render(d, r, index) {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: '商品名',
      align: 'center',
      render(d) {
        return <span>{d.product.name}</span>;
      },
    },
    {
      title: '图片',
      align: 'center',
      render(d) {
        return (
          <img
            src={resetImg(d.product.coverImage)}
            alt={d.product.name}
            style={{ width: '100px', height: '100px' }}
          />
        );
      },
    },
    {
      title: '单价',
      align: 'center',
      render(d) {
        return <span>￥{d.product.price}</span>;
      },
    },
    {
      title: '数量',
      align: 'center',
      width: 166,
      render(d) {
        return (
          <p style={{ display: 'flex', width: '100%' }}>
            <Button
              icon={<MinusOutlined />}
              onClick={async () => {
                if (d.amount > 1) {
                  const newlist = list.map((item) => {
                    if (item.id === d.id) {
                      item.amount--;
                    }
                    return item;
                  });
                  setList(newlist);
                  await addCart({
                    product: d.product.id,
                    amount: -1,
                    price: d.product.price,
                  });
                  dispatch(getCartCount());
                  // console.log(res.msg);
                } else {
                  const newlist = list.map((item) => {
                    if (item.id === d.id) {
                      item.amount = 1;
                    }
                    return item;
                  });
                  setList(newlist);
                }
                if (selectData.indexOf(d.id) > -1) {
                  // console.log(d.id);
                  const sum = selectList.reduce((total, item) => {
                    return (total += item.amount * item.price);
                  }, 0);
                  // console.log(sum);
                  setSumPrice(sum);
                }
              }}
            />
            <Input
              onChange={async (e) => {
                // console.log(e.currentTarget.value);
                // console.log(d.amount);
                if (Number(e.currentTarget.value) > 0) {
                  const oldAmount = d.amount;
                  const newlist = list.map((item) => {
                    if (item.id === d.id) {
                      item.amount = e.currentTarget.value;
                    }
                    return item;
                  });
                  setList(newlist);
                  await addCart({
                    product: d.product.id,
                    amount: e.currentTarget.value - oldAmount,
                    price: d.product.price,
                  });
                  dispatch(getCartCount());
                } else {
                  const oldAmount = d.amount - 1;
                  await addCart({
                    product: d.product.id,
                    amount: -oldAmount,
                    price: d.product.price,
                  });
                  const newlist = list.map((item) => {
                    if (item.id === d.id) {
                      item.amount = 1;
                    }
                    return item;
                  });
                  setList(newlist);
                  dispatch(getCartCount());
                  //因为接口编写者很细心，所以我不需要将小于等于0的数量写入数据库，接口会自动将小于等于0的数量置为1
                }
                console.log(d.id);
                if (selectData.indexOf(d.id) > -1) {
                  // console.log(d.id);
                  // console.log(selectList);
                  const sum = selectList.reduce((total, item) => {
                    return (total += item.amount * item.price);
                  }, 0);
                  // console.log(sum);
                  setSumPrice(sum);
                }
              }}
              value={d.amount}
            />
            <Button
              icon={<PlusOutlined />}
              onClick={async () => {
                /* dispatch({
                  type: 'UPDATE_CARTCOUNT',
                  payload: 12,
                }); */
                if (d.amount > 0) {
                  //对数量进行限制
                  const newList = list.map((item) => {
                    //改变当前点击商品的数量
                    if (item.id === d.id) {
                      item.amount++;
                    }
                    return item;
                  });
                  setList(newList); //改变list
                  await addCart({
                    //调用接口改变购物车数据
                    product: d.product.id,
                    amount: 1,
                    price: d.product.price,
                  });
                  dispatch(getCartCount());
                }
                if (selectData.indexOf(d.id) > -1) {
                  //判断当前商品是否被选中
                  console.log(selectList);
                  const sum = selectList.reduce((total, item) => {
                    return (total += item.amount * item.price);
                  }, 0);
                  setSumPrice(sum);
                }
                // getData();
              }}
            />
          </p>
        );
      },
    },
    {
      title: '操作',
      align: 'center',
      render(d) {
        return (
          <Popconfirm
            title="真的要删除吗？亲~？"
            okText="意已决"
            cancelText="再想想"
            onConfirm={async () => {
              if (selectData.indexOf(d.id) > -1) {
                const newSelectList = selectList.filter(
                  //将选中数据中的该数据删除
                  (item) => item.id !== d.id
                );
                const newSelectData = selectData.filter(
                  //将选中数据id中该数据id删除
                  (item) => item !== d.id
                );
                const sum = newSelectList.reduce((total, item) => {
                  //重新计算选中数据中的合计价格
                  return (total += item.amount * item.price);
                }, 0);
                // console.log(sum);
                setSumPrice(sum);
                setSelectList([...newSelectList]); //改变选中数据数据
                setSelectData([...newSelectData]); //改变选中数据id
              }
              const newList = list.filter(
                (item) => item.id !== d.id
                //过滤出所有数据在删除数组中不存在的数据，重新赋值给list去回流页面
              );
              setList([...newList]); //改变list
              const res = await delCart(d.id);
              if (res.code === 1) {
                message.success(res.msg);
                dispatch(getCartCount());
              } else {
                message.error(res.msg);
              }
            }}
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      },
    },
  ];
  //选中时的操作
  const rowSelection = {
    selectedRowKeys: selectData,
    onChange(id, data) {
      // console.log(a);
      console.log(data);
      setSelectData(id); //将选中的数据id存起来
      setSelectList([...data]); //将选中的数据存起来
      setDelList([...id]); //将选中即将删除的数据id存起来
      console.log('checked');
      const sum = data.reduce((total, item) => {
        return (total += item.amount * item.price);
      }, 0);
      // console.log(sum);
      setSumPrice(sum); //改变合计价格
    },
  };

  return (
    <div>
      <Card
        title="购物车"
        extra={
          <Popconfirm
            title="真的要删除吗？亲~？"
            okText="意已决"
            cancelText="再想想"
            onConfirm={() => {
              // console.log(delList);
              const newList = list.filter((item) => {
                //过滤出所有数据在删除数组中不存在的数据，重新赋值给list去回流页面
                return delList.indexOf(item.id) === -1;
              });
              setList([...newList]); //改变list
              delList.forEach((item) => {
                //将数据库中的选中数据删除
                delCart(item);
              });
              message.success('删除成功！');
              // getData();
              // setSumPrice(0);
            }}
          >
            <Button>删除选中</Button>
          </Popconfirm>
        }
      >
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          bordered
          rowSelection={rowSelection}
        ></Table>
      </Card>
      <h1 style={{ color: 'black', textAlign: 'right' }}>
        <span>合计：</span>
        <span>
          <i style={{ color: 'red' }}>{sumPrice}</i>元
        </span>
        <Button>结算</Button>
      </h1>
    </div>
  );
}

export default Cart;
