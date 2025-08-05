// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Ensure you have your CSS imported
import './index.css'; // Import Tailwind CSS
import AuthPage from './pages/AuthPage';
import GymProfileForm from './pages/GymProfileForm';
import TrainerProfileForm from './pages/TrainerProfileForm';  // Import your AuthPage component
// Ensure you have your Tailwind CSS imported
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/pages/GymProfileForm" element={< GymProfileForm/>} />
          <Route path="/pages/TrainerProfileForm" element={< TrainerProfileForm/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;