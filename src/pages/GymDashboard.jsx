// src/pages/GymDashboard.jsx
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import { useState, useEffect } from 'react';

export default function GymDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 342,
    monthlyRevenue: '$18,420',
    occupancyRate: '78%',
    newSignups: 28,
    activeClasses: 24,
    staffCount: 12,
  });

  // Staff Data
  const staff = [
    { id: 1, name: 'Sarah Johnson', role: 'Lead Trainer', sessions: 24, rating: '4.9⭐', avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', role: 'HIIT Coach', sessions: 18, rating: '4.7⭐', avatar: 'MC' },
    { id: 3, name: 'Lisa Wong', role: 'Yoga Instructor', sessions: 20, rating: '4.8⭐', avatar: 'LW' },
    { id: 4, name: 'Alex Rivera', role: 'Strength Coach', sessions: 22, rating: '4.7⭐', avatar: 'AR' },
  ];

  // ✅ Enhanced Members Data
  const members = [
    { id: 1, name: 'Emma Thompson', plan: 'Premium', joined: 'Jun 15', attendance: 94, avatar: 'ET', status: 'active' },
    { id: 2, name: 'David Kim', plan: 'Basic', joined: 'Jul 1', attendance: 82, avatar: 'DK', status: 'active' },
    { id: 3, name: 'Sophia Lee', plan: 'Elite', joined: 'May 20', attendance: 96, avatar: 'SL', status: 'active' },
    { id: 4, name: 'James Park', plan: 'Premium', joined: 'Jul 10', attendance: 68, avatar: 'JP', status: 'low-attendance' },
  ];

  // ✅ Weekly Occupancy Data (Mon-Sun)
  const weeklyData = [68, 72, 78, 82, 88, 94, 70]; // %
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalMembers: prev.totalMembers + 1,
        monthlyRevenue: `$${(parseFloat(prev.monthlyRevenue.slice(1).replace(/,/g, '')) + 54).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
        occupancyRate: `${Math.min(parseInt(prev.occupancyRate) + 1, 95)}%`,
        newSignups: prev.newSignups + 1,
      }));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* ✅ Sidebar */}
      <Sidebar userRole="gym" />

      {/* ✅ Main Content */}
      <div className="ml-64 w-full min-h-screen">
        {/* ✅ Header */}
        <Header title="Gym Dashboard" subtitle="Welcome back, Owner 👋" />

        {/* ✅ Content */}
        <main className="p-6 space-y-8 animate-fade-in">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <StatsCard
              title="Total Members"
              value={stats.totalMembers}
              icon="👥"
              change="+3.2% from last month"
              positive
              color="from-blue-500 to-emerald-600"
            />
            <StatsCard
              title="Monthly Revenue"
              value={stats.monthlyRevenue}
              icon="💰"
              change="+6.4% from last month"
              positive
              color="from-emerald-500 to-teal-600"
            />
            <StatsCard
              title="Occupancy Rate"
              value={stats.occupancyRate}
              icon="🏢"
              change="+2.1% from last week"
              positive
              color="from-indigo-500 to-violet-600"
            />
            <StatsCard
              title="Active Classes"
              value={stats.activeClasses}
              icon="📅"
              change="+2 new this month"
              positive
              color="from-orange-500 to-red-600"
            />
            <StatsCard
              title="Staff Members"
              value={stats.staffCount}
              icon="👨‍🏫"
              change="All active"
              positive
              color="from-purple-500 to-pink-600"
            />
            <StatsCard
              title="New Signups"
              value={stats.newSignups}
              icon="🎉"
              change="Great week!"
              positive
              color="from-green-500 to-teal-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ✅ Staff Performance */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                👨‍🏫 Staff Performance
              </h3>
              <div className="space-y-4">
                {staff.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl hover:bg-primary/10 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary">{member.sessions} sessions</div>
                        <div className="text-xs text-emerald-600 mt-0.5">{member.rating}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Beautiful Members Overview (Card Grid) */}
            <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                🧑‍🤝‍🧑 Members Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl hover:from-blue-50 hover:to-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                        {m.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{m.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              m.plan === 'Elite'
                                ? 'bg-purple-100 text-purple-800'
                                : m.plan === 'Premium'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {m.plan}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              m.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {m.status === 'active' ? 'Active' : 'Review'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Attendance Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Attendance</span>
                        <span>{m.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000 ease-out"
                          style={{ width: `${m.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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