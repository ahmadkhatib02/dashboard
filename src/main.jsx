import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initializePWA } from './utils/pwa.js'

// Initialize PWA features
initializePWA();

createRoot(document.getElementById('root')).render(
     <App />
)
