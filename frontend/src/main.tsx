import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n' // Import i18n first
import './index.css'
import './styles/advanced-ui.css'
import './main.css'
import App from './App.tsx'

// Initialize i18n before rendering
import i18n from './i18n'

// Wait for i18n to be ready
i18n.init().then(() => {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});

// Force a repaint of the entire page
document.documentElement.style.display = 'none';
setTimeout(() => {
  document.documentElement.style.display = '';
}, 10);
