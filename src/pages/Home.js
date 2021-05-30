import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCategories } from '../services/categories';
import { resetImg } from '../utils/tools';
import { Card, Button } from 'antd';
import Item from 'antd/lib/list/Item';

function Home() {
  const [categoryList, setCategory] = useState([]);
  const history = useHistory();
  const getCategory = async () => {
    const res = await getCategories();
    console.log(res.data);
    setCategory(res.data);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div>
      {categoryList.map((item) => {
        return (
          <Card
            title={<h1>{item.name}</h1>}
            key={item.id}
            extra={
              <Button onClick={() => history.push('/main/list?id=' + item.id)}>
                了解更多
              </Button>
            }
          >
            <img
              src={resetImg(item.coverImage)}
              alt={item.name}
              style={{ width: '300px' }}
            />
            <p>{item.desc}</p>
          </Card>
        );
      })}
    </div>
  );
}

export default Home;
