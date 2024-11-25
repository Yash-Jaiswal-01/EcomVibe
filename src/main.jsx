
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartState from './context/CartState.jsx'
import UserState from './context/UserState.jsx'

createRoot(document.getElementById('root')).render(
  <UserState>
    <CartState>
    <App />
  </CartState>
  </UserState>,
)
