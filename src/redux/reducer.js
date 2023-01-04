import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { AuthReducer } from './Auth/AuthReducer';
import { DashboardReducer } from './Dashboard/DashboardReducer';

// we will connect our reducers here

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    dashboard:DashboardReducer
  });

const createRootReducer = (history) => (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(history)(state, action);
};

export default createRootReducer;
