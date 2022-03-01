import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// MicroApps bootstrap 主App
import { registerMicroApps, start } from 'qiankun';
registerMicroApps([
  {
    name: 'p2', // app name registered
    entry: '//localhost:3002',
    container: '#micro-app1',
    activeRule: '/app2',
  },
  // {
  //   name: 'reactMicroApp2',
  //   entry: { scripts: ['//localhost:3003/main.js'] },
  //   container: '#reactMicroApp2',
  //   activeRule: '/yourActiveRule2',
  // },
]);
start();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
