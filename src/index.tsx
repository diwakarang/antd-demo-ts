import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter basename="/antd-demo-ts">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="new" element={<App type="new"/>} />
      <Route path="enterdata/:id" element={<App type="enterData" />} />
      <Route path="viewdata/:id" element={<App type="viewData" />} />
    </Routes>
  </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);


