import { get, post, del } from '../utils/request';

export const addCart = (params) => post('/api/v1/shop_carts', params);

export const getCart = () => get('/api/v1/shop_carts');

export const delCart = (id) => del('/api/v1/shop_carts/' + id);
