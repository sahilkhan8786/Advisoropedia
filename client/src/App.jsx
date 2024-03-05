import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import SingleProductPage from './pages/SingleProductPage'
import Cart from './pages/Cart'
import axios from 'axios'
import Register from './pages/Register'
function App() {

  axios.defaults.baseURL = 'http://localhost:3000/'
  axios.defaults.withCredentials = true
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/' element={<Home />} />
      <Route path='/user/cart' element={<Cart />} />
      <Route path='/products/:id' element={<SingleProductPage />} />

    </Routes>

  )
}
export default App
