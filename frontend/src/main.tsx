import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import CSS in the correct order
import './index.css'
import './styles/advanced-ui.css'
import './main.css'
import './i18n'
import App from './App.tsx'

// Force a repaint of the entire page
document.documentElement.style.display = 'none';
setTimeout(() => {
  document.documentElement.style.display = '';
}, 10);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
