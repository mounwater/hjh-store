import { get } from '../utils/request';

export const loadProducts = (params) => {
  return get('/api/v1/products', params);
};
export const loadDetail = (id) => get(`/api/v1/products/${id}`);
