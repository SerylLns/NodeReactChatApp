import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import rootReducer from './redux/reducers';
import { applyMiddleware, createStore } from 'redux';
import { getAllUsers } from "./redux/actions/usersAction";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllChatrooms } from './redux/actions/chatroomsAction';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(getAllUsers());
store.dispatch(getAllChatrooms());
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
