import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <App />
    </SkeletonTheme>
  </React.StrictMode>
);