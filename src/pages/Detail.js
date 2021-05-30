import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { loadDetail } from '../services/products';
import { Card } from 'antd';

function Detail() {
  const [detail, setDetail] = useState([]);
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
      <h1 style={{ color: 'black' }}>{detail.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
    </div>
  );
}

export default Detail;
