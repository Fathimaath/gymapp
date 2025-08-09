// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Ensure you have your CSS imported
import './index.css'; 
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import AuthPage from './pages/AuthPage';
import Schedule from './pages/Schedule';
import Payments from './pages/Payments';
import Profile from './pages/Profile';  
import GymDashboard from './pages/GymDashboard'; 
import Members from './pages/Members';
import Staff from './pages/Staff';
import GymSchedule from './pages/GymSchedule';
import GymPayments from './pages/GymPayments';
import Settings from './pages/Settings';
import GymProfileForm from './pages/GymProfileForm';
import TrainerProfileForm from './pages/TrainerProfileForm';  // Import your AuthPage component
// Ensure you have your Tailwind CSS imported
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
        <Routes>
           <Route path="/" element={<GymDashboard />} />
          <Route path="/GymDashboard" element={<GymDashboard />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Members" element={<Members />} />
          <Route path="/GymSchedule" element={<GymSchedule />} />
          <Route path="/GymPayments" element={<GymPayments />} />
          <Route path="/Staff" element={<Staff/>} />
          <Route path="/Settings" element={<Settings/>} />
          <Route path="/Clients" element={<Clients />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/Payments" element={<Payments />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/Profile" element={<Profile />} />
          {/* Add more routes as needed */}
          <Route path="/pages/GymProfileForm" element={< GymProfileForm/>} />
          <Route path="/pages/TrainerProfileForm" element={< TrainerProfileForm/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;