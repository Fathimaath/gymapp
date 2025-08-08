// src/pages/Dashboard.jsx
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const userRole = 'trainer';
  const [stats, setStats] = useState({
    totalClients: 48,
    sessionsThisWeek: 24,
    revenue: '$2,480',
    availability: '12 hrs',
  });

  const recentClients = [
    { id: 1, name: 'Sarah Johnson', plan: 'Premium', joined: '2 days ago', progress: 75, avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', plan: 'Basic', joined: '5 days ago', progress: 40, avatar: 'MC' },
    { id: 3, name: 'Lisa Wong', plan: 'Premium', joined: '1 week ago', progress: 90, avatar: 'LW' },
    { id: 4, name: 'Alex Rivera', plan: 'Elite', joined: '3 days ago', progress: 20, avatar: 'AR' },
  ];

  const upcomingSessions = [
    { time: 'Today, 6:00 PM', client: 'Sarah Johnson', type: 'Strength Training', duration: '60 min' },
    { time: 'Tomorrow, 7:30 AM', client: 'Mike Chen', type: 'HIIT', duration: '45 min' },
    { time: 'Tomorrow, 6:00 PM', client: 'Lisa Wong', type: 'Yoga & Mobility', duration: '60 min' },
  ];

  const weeklyData = [60, 80, 70, 90, 100, 120, 50];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalClients: prev.totalClients + 1,
        sessionsThisWeek: Math.min(prev.sessionsThisWeek + 1, 30),
        revenue: `$${(parseFloat(prev.revenue.slice(1).replace(/,/g, '')) + 25)
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar userRole={userRole} />
      <div className="ml-64 w-full min-h-screen">
        <Header title="Dashboard" subtitle="Welcome back, Trainer 👋" />
        <main className="p-6 space-y-8 animate-fade-in">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Clients", value: stats.totalClients, icon: "👥", change: "+12%", color: "from-blue-500 to-emerald-600" },
              { title: "Sessions This Week", value: stats.sessionsThisWeek, icon: "📅", change: "+5%", color: "from-emerald-500 to-teal-600" },
              { title: "Revenue", value: stats.revenue, icon: "💰", change: "+8%", color: "from-indigo-500 to-violet-600" },
              { title: "Availability", value: stats.availability, icon: "⏰", change: "-2 hrs", color: "from-orange-500 to-red-500" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/30 transform-hover glow-hover"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className={`text-3xl p-2 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-md`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Clients & Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Clients */}
            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">🧑‍🤝‍🧑 Recent Clients</h3>
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-white cursor-pointer transform-hover group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                        {client.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.plan} Plan • Joined {client.joined}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">{client.progress}% Progress</p>
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${client.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">⏱ Upcoming Sessions</h3>
              <div className="space-y-4">
                {upcomingSessions.map((session, i) => (
                  <div
                    key={i}
                    className="p-4 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent rounded-r-xl hover:bg-blue-100 cursor-pointer transform-hover group"
                  >
                    <div className="flex justify-between">
                      <p className="font-semibold text-gray-800 group-hover:text-blue-700">{session.time}</p>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {session.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{session.client}</p>
                    <p className="text-xs font-medium text-blue-600 mt-1">{session.type}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Performance Chart */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">📈 Weekly Performance</h3>
                <p className="text-sm text-gray-500">Training sessions completed</p>
              </div>
              <div className="w-2 h-2 bg-gradient-to-t from-blue-500 to-emerald-500 rounded-full shadow-sm"></div>
            </div>

            <div className="relative h-52 flex items-end justify-between px-4">
              {weeklyData.map((value, i) => {
                const height = (value / 130) * 100;
                const prev = i === 0 ? 0 : weeklyData[i - 1];
                const x1 = ((i - 1) / 6) * 100;
                const x2 = (i / 6) * 100;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 mx-1 relative group" style={{ height: '100%' }}>
                    {i > 0 && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line
                          x1={`${x1 + 5.5}%`}
                          y1={`${100 - (prev / 130) * 100 + 5}%`}
                          x2={`${x2 + 5.5}%`}
                          y2={`${100 - (value / 130) * 100 + 5}%`}
                          stroke="url(#chartGradient)"
                          strokeWidth="3"
                          filter="url(#glow)"
                          className="transition-all duration-1000"
                        />
                      </svg>
                    )}
                    <defs>
                      <linearGradient id="chartGradient">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-t from-blue-500 to-emerald-500 shadow-lg z-10 cursor-pointer animate-pulse-slow ${
                        value >= 100 ? 'animate-bounce-slow' : ''
                      }`}
                      title={`${value} sessions`}
                    ></div>
                    <div
                      className="w-2 bg-gradient-to-t from-blue-200 to-blue-400 rounded-t-full origin-bottom opacity-50 group-hover:opacity-80 transition"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition whitespace-nowrap">
                      <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">{value} sessions</div>
                      <div className="w-2 h-2 bg-gray-800 rotate-45 mx-auto -mt-1"></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 font-medium group-hover:text-blue-700">{days[i]}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 text-sm font-medium">
              <div className="flex-1 text-center">
                <p className="font-bold text-emerald-600">{Math.max(...weeklyData)}</p>
                <p className="text-gray-500 text-xs">Peak</p>
              </div>
              <div className="flex-1 text-center">
                <p className="font-bold text-orange-500">{Math.min(...weeklyData)}</p>
                <p className="text-gray-500 text-xs">Low</p>
              </div>
              <div className="flex-1 text-center">
                <p className="font-bold text-blue-600">{Math.round(weeklyData.reduce((a, b) => a + b, 0) / 7)}</p>
                <p className="text-gray-500 text-xs">Avg</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}