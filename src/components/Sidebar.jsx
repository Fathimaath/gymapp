// src/components/Sidebar.jsx
export default function Sidebar({ userRole = 'trainer', photoPreview = '' }) {
  const menuItems = userRole === 'gym'
    ? [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Clients', icon: '👥', path: '/clients' },
        { name: 'Schedule', icon: '📅', path: '/schedule' },
        { name: 'Payments', icon: '💰', path: '/payments' },
        { name: 'Trainers', icon: '🏋️‍♂️', path: '/trainers' },
        { name: 'Settings', icon: '⚙️', path: '/settings' },
      ]
    : [
        { name: 'Dashboard', icon: '📊', path: '/dashboard' },
        { name: 'Clients', icon: '👥', path: '/clients' },
        { name: 'Schedule', icon: '📅', path: '/schedule' },
        { name: 'Payments', icon: '💰', path: '/payments' },
        { name: 'Profile', icon: '👤', path: '/profile' },
      ];

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-primary">FitConnect</h1>
        <p className="text-sm text-gray-600">{userRole === 'gym' ? 'Gym Admin' : 'Trainer'}</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-lg transition"
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center text-sm font-medium">
                JD
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">{userRole === 'gym' ? 'Elite Gym' : 'Trainer'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}