import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store/store.js';
import { Provider } from 'react-redux';
import { Toaster } from './components/ui/sonner.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store} >
      <App />
      <Toaster/>
    </Provider>
  </StrictMode>,
)
