import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/'
import Signup from './pages/User/SignupPage';
import Login from './pages/User/LoginPage';
import Main from './pages/MainPage';
import Profile from './pages/ProfilePage';
import Market from './pages/Nft/MarketPage';
import Product from './pages/Nft/ProductPage';
import ProfileEdit from './components/Profile/ProfileEdit';
import Result from './pages/SearchResultPage/';
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
        <Route path="/profileedit/" element={isLoggedIn ? <ProfileEdit/> : <Login/>} />
        <Route path="/profile/:id" element={isLoggedIn ? <Profile/>  : <Login/>} />
        <Route path="/nft" element={isLoggedIn ? <Market/>  : <Login/>} />
        <Route path="/nft/:id" element={isLoggedIn ? <Product/>  : <Login/>} />
        <Route path="/search/tags/:tags" element={isLoggedIn ? <Result/> : <Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
