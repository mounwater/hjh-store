import { get, put } from '../utils/request';

export const getUsers = () => {
  return get('/api/v1/user/info');
};

export const lockUsers = (id, isLocked) => {
  return put(`/api/v1/admin/user/${id}`, { isLocked: isLocked });
};

export const modifyUsers = (data) => {
  return put('/api/v1/user/modify', data);
};

export const modifyPwd = (params) => put('/api/v1/user/update_pwd', params);
