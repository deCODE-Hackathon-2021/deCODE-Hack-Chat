import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {initializeChat} from "./redux/chat/chat";

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

initializeChat(store, {
    identity: `facebook_uid ${Math.random()}`,
    name: 'Facebook Name'
});

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
