import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.tsx';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

