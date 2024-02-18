import logo from './logo.svg';
import './App.css';
import Component from './components/Component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Products from './pages/product';
import Home from './pages/home/home';
import Layout from './components/Layout';
import NotFound from './pages/404';
import Organize from './pages/product/organize';
import Member from './pages/product/member';
import NganhNghe from './pages/danh-muc/nganh-nghe';
import Khoa from './pages/danh-muc/khoa';
import Class from './pages/danh-muc/lop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path='/danh-muc'>
              <Route path='nganh-nghe' element={<NganhNghe/>} />
              <Route path='khoa' element={<Khoa/>} />
              <Route path='class' element={<Class/>} />
            </Route>
            <Route path="/to-chuc" element={<Organize />} />
            <Route path="/thanh-vien" element={<Member />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
