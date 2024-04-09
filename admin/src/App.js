
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './component/header/Header';
import LoginPage from './page/LoginPage';
import { useState } from 'react'
import DashBoard from './page/Dashboard';
import SideBar from './component/SideBar.js/SideBar';
import Products from './page/Products';
import NewProduct from './page/NewProduct';
import ChatPage from './page/ChatPage';

function App()
{
  const [products, setProducts] = useState([])
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false)
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')

  return (
    <Router>
      <Header setIsLogin={setIsLogin} setUserName={setUserName} userName={userName} isLogin={isLogin}></Header>
      <SideBar></SideBar>
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} setUserName={setUserName} isLogin={isLogin} />} />
        <Route path='/products' element={<Products products={products} setProducts={setProducts} />} />
        <Route path='/new-product' element={<NewProduct products={products} />} />
        <Route path='/chat' element={<ChatPage isLogin={isLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
