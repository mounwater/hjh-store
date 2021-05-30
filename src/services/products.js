import { get } from '../utils/request';

export const loadProducts = (params) => {
  return get('/api/v1/admin/product', params);
};
