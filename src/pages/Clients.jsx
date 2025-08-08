// src/pages/Clients.jsx
import Sidebar from '../components/Sidebar';
import { useState, useMemo } from 'react';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const clients = [
    { id: 1, name: 'Sarah Johnson', avatar: 'SJ', email: 'sarah.j@email.com', plan: 'Premium', joinDate: '2024-06-15', sessionsThisWeek: 3, progress: 75, lastActive: '2 hours ago', status: 'active' },
    { id: 2, name: 'Mike Chen', avatar: 'MC', email: 'mike.c@email.com', plan: 'Basic', joinDate: '2024-07-01', sessionsThisWeek: 2, progress: 40, lastActive: '1 day ago', status: 'active' },
    { id: 3, name: 'Lisa Wong', avatar: 'LW', email: 'lisa.w@email.com', plan: 'Premium', joinDate: '2024-05-20', sessionsThisWeek: 4, progress: 90, lastActive: '30 min ago', status: 'active' },
    { id: 4, name: 'Alex Rivera', avatar: 'AR', email: 'alex.r@email.com', plan: 'Elite', joinDate: '2024-07-10', sessionsThisWeek: 1, progress: 20, lastActive: '5 days ago', status: 'inactive' },
    { id: 5, name: 'Emma Thompson', avatar: 'ET', email: 'emma.t@email.com', plan: 'Premium', joinDate: '2024-06-05', sessionsThisWeek: 3, progress: 65, lastActive: '4 hours ago', status: 'active' },
    { id: 6, name: 'David Kim', avatar: 'DK', email: 'david.k@email.com', plan: 'Basic', joinDate: '2024-08-01', sessionsThisWeek: 0, progress: 10, lastActive: '1 week ago', status: 'inactive' },
  ];

  const plans = ['all', 'Elite', 'Premium', 'Basic'];

  const filteredAndSortedClients = useMemo(() => {
    let result = clients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterPlan !== 'all') {
      result = result.filter((client) => client.plan === filterPlan);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'sessions') return b.sessionsThisWeek - a.sessionsThisWeek;
      return 0;
    });

    return result;
  }, [searchTerm, filterPlan, sortBy]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar userRole="trainer" />
      <div className="ml-64 flex-1 p-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👥 Clients</h1>
          <p className="text-gray-600 mt-2">Manage, track, and grow your client relationships</p>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">🔍 Search</label>
              <input
                type="text"
                placeholder="Name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🎯 Plan</label>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500 bg-white transition"
              >
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan === 'all' ? 'All Plans' : plan}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">📊 Sort</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-300 focus:border-blue-500 bg-white transition"
              >
                <option value="name">Name</option>
                <option value="progress">Progress</option>
                <option value="sessions">Sessions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Client List */}
        <div className="space-y-5">
          {filteredAndSortedClients.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 animate-bounce">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700">No clients found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
            </div>
          ) : (
            filteredAndSortedClients.map((client) => (
              <div
                key={client.id}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/30 transform-hover group"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                      {client.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">
                        {client.name}
                      </h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-sm text-gray-500">
                        <span>{client.email}</span>
                        <span>•</span>
                        <span>📅 Joined <b>{new Date(client.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</b></span>
                        <span>•</span>
                        <span>⏰ Last active <b>{client.lastActive}</b></span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Ring */}
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="url(#clientGradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(client.progress / 100) * 251} 251`}
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient id="clientGradient">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700">{client.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 min-w-fit">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">This Week</div>
                      <div className="text-lg font-bold text-gray-800">{client.sessionsThisWeek}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Plan</div>
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        client.plan === 'Elite' ? 'bg-purple-100 text-purple-800' :
                        client.plan === 'Premium' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-700'
                      }`}>{client.plan}</span>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Status</div>
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>{client.status}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition transform-hover glow-hover">
                        Message
                      </button>
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm p-5 rounded-3xl shadow-lg border border-white/30 text-sm text-gray-600">
          <p>
            Showing <b>{filteredAndSortedClients.length}</b> of <b>{clients.length}</b> clients •{' '}
            <span className="text-green-600 font-medium">
              {clients.filter(c => c.status === 'active').length} active
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}