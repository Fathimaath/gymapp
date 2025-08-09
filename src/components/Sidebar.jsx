// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ userRole }) {
  const location = useLocation();

  // Define links based on role
  const links = userRole === 'gym'
    ? [
        { name: 'Dashboard', path: '/GymDashboard', icon: '📊' },
        { name: 'Staffs', path: '/staff', icon: '👨‍🏫' },
        { name: 'Members', path: '/members', icon: '👥' },
        { name: 'Schedule', path: '/GymSchedule', icon: '📅' },
        { name: 'Payments', path: '/GymPayments', icon: '💰' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
      ]
    : [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Clients', path: '/clients', icon: '🧑‍🤝‍🧑' },
        { name: 'Schedule', path: '/schedule', icon: '📅' },
        { name: 'Payments', path: '/payments', icon: '💰' },
        { name: 'Profile', path: '/profile', icon: '👤' },
      ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-sm border-r border-white/30 shadow-xl z-50">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          {userRole === 'gym' ? 'Urban Fit Studio' : 'Trainer Panel'}
        </h2>
        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-emerald-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-white/50'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}