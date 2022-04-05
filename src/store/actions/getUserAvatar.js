import { getUsers } from '../../services/users';
import { resetImg } from '../../utils/tools';

export const getUserAvatar = () => (disptach) => {
  getUsers().then((res) => {
    // console.log(res);
    const avatar = res.data.avatar;
    disptach({
      type: 'UPDATE_AVATAR',
      payload: resetImg(avatar),
    });
  });
};
