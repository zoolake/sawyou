import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/'
import Signup from './pages/User/SignupPage';
import Login from './pages/User/LoginPage';
import Main from './pages/MainPage';
import Profile from './pages/ProfilePage';
import Market from './pages/Nft/MarketPage';
import Product from './pages/Nft/ProductPage';
import { User } from './States/User';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

function App() {
  let isLoggedIn = false;
  const user = useRecoilValue(User);
  if(user === false){
    isLoggedIn = false;
  }
  else{
    isLoggedIn = true;
  }

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route exact path="/" element={isLoggedIn ? <Main/> : <Login/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/nft" element={<Market/>} />
        <Route path="/nft/product" element={<Product/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
