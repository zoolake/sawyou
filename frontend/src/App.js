import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/User/SignupPage';
import Login from './pages/User/LoginPage';
import Main from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts/signup" element={<Signup/>} />
        <Route path="/accounts/Login" element={<Login/>} />
        <Route path="/" element={<Main/>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
