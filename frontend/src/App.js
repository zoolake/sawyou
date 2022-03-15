import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/User/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/accounts/signup" element={<Signup/>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
