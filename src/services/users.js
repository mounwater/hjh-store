import { get, put } from '../utils/request';

export const getUsers = (page = 1) => {
  return get('/api/v1/admin/user', { page });
};

export const lockUsers = (id, isLocked) => {
  return put(`/api/v1/admin/user/${id}`, { isLocked: isLocked });
};
