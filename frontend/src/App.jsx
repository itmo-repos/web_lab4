import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {AuthPage} from './pages/AuthPage/AuthPage';
import {MainPage} from './pages/MainPage/MainPage';
import './App.css';
import { useAuth } from './components/AuthContext/AuthContext';



export function App() {
  const { isAuthenticated } = useAuth(); 

  return (
    <BrowserRouter basename="/lab4">
      <Routes>
        <Route path="/auth" element={<AuthPage/>}/>

        <Route path="/main" element={isAuthenticated ? <MainPage /> : <Navigate to="/auth" />} />
        <Route path="/"    element={isAuthenticated ? <MainPage /> : <Navigate to="/auth" />} />

        <Route path="*" element={<div>Страница не найдена.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

