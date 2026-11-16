// Ensure window.fetch has both getter and setter in iframe/sandboxed environments
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(fn) {
        currentFetch = fn;
      },
    });
  } catch (e) {
    try {
      if (typeof Window !== 'undefined' && Window.prototype) {
        let protoFetch = Window.prototype.fetch;
        Object.defineProperty(Window.prototype, 'fetch', {
          configurable: true,
          enumerable: true,
          get() {
            return protoFetch;
          },
          set(fn) {
            protoFetch = fn;
          },
        });
      }
    } catch {}
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
