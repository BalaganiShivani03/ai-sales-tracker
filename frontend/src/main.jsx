import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css'; // ✅ Updated to import your new CSS
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
