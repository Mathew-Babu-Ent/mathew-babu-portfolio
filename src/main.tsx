import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Let the case-study entrance play in view after a direct load or hard refresh.
if (['#businesspulse-case-study', '#sales-analytics-case-study'].includes(window.location.hash)) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';
  window.history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  root.style.scrollBehavior = previousScrollBehavior;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App /></React.StrictMode>,
);
