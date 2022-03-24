import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/'
import Signup from './pages/User/SignupPage';
import Login from './pages/User/LoginPage';
import Main from './pages/MainPage';
import Profile from './pages/ProfilePage';

function App() {
  let isLoggedIn = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts/signup" element={<Signup/>} />
        <Route exact path="/" element={isLoggedIn ? <Main/> : <Login/>} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile/" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
