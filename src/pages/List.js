import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { loadProducts } from '../services/products';
import { Card } from 'antd';
import '../assets/css/list.css';
import { resetImg } from '../utils/tools';

const gridStyle = {
  cursor: 'pointer',
  width: '25%',
  textAlign: 'center',
};

function List() {
  const history = useHistory();
  const [list, setList] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const id = query.get('id');
  const getProduct = async () => {
    const res = await loadProducts({ category: id ? id : '' });
    // console.log(res);
    setList(res.data);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <h1>列表</h1>
      <Card title="测试">
        {list.map((item) => (
          <Card.Grid
            style={gridStyle}
            key={item.id}
            onClick={() => history.push('/main/detail/' + item.id)}
          >
            <img src={resetImg(item.coverImage)} alt={item.name} />
            <h2
              style={{
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.name}
            </h2>
            {item.desc ? <h3>{item.desc}</h3> : <h3>暂无介绍</h3>}
          </Card.Grid>
        ))}
      </Card>
    </div>
  );
}

export default List;
