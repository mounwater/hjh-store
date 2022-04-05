import { getCart } from '../../services/cart';

export const getCartCount = () => (disptach) => {
  getCart().then((res) => {
    // console.log(res);
    const cartCount = res.data.reduce((total, item) => {
      return (total += item.amount);
    }, 0);
    disptach({
      type: 'UPDATE_CARTCOUNT',
      payload: cartCount,
    });
  });
};
