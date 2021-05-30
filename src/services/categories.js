import { get } from '../utils/request';

export const getCategories = () => get('/api/v1/product_categories');
