import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function userReducer(
  state = {
    cartCount: '',
    userAvatar:
      'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  action
) {
  console.log(action);
  switch (action.type) {
    case 'UPDATE_CARTCOUNT':
      return { ...state, cartCount: action.payload };
    case 'UPDATE_AVATAR':
      return { ...state, userAvatar: action.payload };
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({ userReducer }),
  compose(
    applyMiddleware(...[thunk]), // 配置扩展插件可以在浏览器中追踪数据的改变
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
