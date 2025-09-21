import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Render the main App component into the root div
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
