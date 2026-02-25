import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// eslint-disable-next-line no-undef
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)