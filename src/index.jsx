import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            fontSize: 18,
            dotSizeLG: 50,
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
