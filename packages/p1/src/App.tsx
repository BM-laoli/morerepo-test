import React from 'react';
import logo from './logo.svg';
import './App.css';

// 测试多包
import {Alert } from 'ngmcore'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Alert kind="info">这是一条警告提示</Alert>
      </header>
    </div>
  );
}

export default App;
