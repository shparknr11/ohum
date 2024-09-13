import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './styles/reset.css';
import './styles/_common.scss';
import Start from './pages/Start';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        ></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
