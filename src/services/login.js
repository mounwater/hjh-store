import { post } from '../utils/request';

/* export const managersLogin = (userName, password) =>
  post('/api/v1/auth/manager_login', {
    userName,
    password,
  }); */
export const usersLogin = (user) => post('/api/v1/auth/login', user);
