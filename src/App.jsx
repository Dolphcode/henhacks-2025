import './App.css';
import { GoogleMap } from '@react-google-maps/api'
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;