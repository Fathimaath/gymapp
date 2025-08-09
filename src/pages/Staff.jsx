// src/pages/Staff.jsx
import Sidebar from '../components/Sidebar';
import { useState, useMemo } from 'react';

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Enhanced staff data (same as before)
  const staff = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Lead Trainer',
      clients: 48,
      sessions: 24,
      rating: '4.9⭐',
      avatar: 'SJ',
      status: 'active',
      availability: 'Mon-Fri 6AM-8PM',
      certifications: ['NASM-CPT', 'CrossFit L1'],
      weeklyHours: 32,
      revenue: '$2,480',
      performance: [6, 8, 7, 9, 10, 8, 0],
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'HIIT Coach',
      clients: 32,
      sessions: 18,
      rating: '4.6⭐',
      avatar: 'MC',
      status: 'active',
      availability: 'Mon, Wed, Fri 7AM-9PM',
      certifications: ['ACE Group Fitness', 'TRX'],
      weeklyHours: 28,
      revenue: '$1,920',
      performance: [4, 0, 5, 0, 6, 3, 0],
    },
    {
      id: 3,
      name: 'Lisa Wong',
      role: 'Yoga Instructor',
      clients: 38,
      sessions: 20,
      rating: '4.8⭐',
      avatar: 'LW',
      status: 'on-leave',
      availability: 'Tue, Thu, Sat 8AM-12PM',
      certifications: ['RYT-200', 'Prenatal Yoga'],
      weeklyHours: 20,
      revenue: '$1,800',
      performance: [0, 4, 0, 5, 0, 4, 0],
    },
    {
      id: 4,
      name: 'Alex Rivera',
      role: 'Strength Coach',
      clients: 41,
      sessions: 22,
      rating: '4.7⭐',
      avatar: 'AR',
      status: 'active',
      availability: 'Mon-Fri 4PM-9PM',
      certifications: ['ISSA', 'Nutrition Coach'],
      weeklyHours: 30,
      revenue: '$2,100',
      performance: [0, 7, 6, 8, 9, 0, 0],
    },
  ];

  const roles = ['all', 'Lead Trainer', 'HIIT Coach', 'Yoga Instructor', 'Strength Coach'];
  const statuses = ['all', 'active', 'on-leave'];

  // Filter and Sort Logic
  const filteredAndSortedStaff = useMemo(() => {
    let result = staff.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            s.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || s.role === filterRole;
      const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sessions':
          return b.sessions - a.sessions;
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'revenue':
          return parseFloat(b.revenue.slice(1)) - parseFloat(a.revenue.slice(1));
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterRole, filterStatus, sortBy]);

  const openModal = (staffMember) => {
    setSelectedStaff(staffMember);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStaff(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* ✅ Sidebar */}
      <Sidebar userRole="gym" />

      {/* ✅ Main Content */}
      <div className="ml-64 flex-1 p-6 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👨‍🏫 Staff</h1>
          <p className="text-gray-600 mt-2">Manage, track, and grow your trainer team</p>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">🔍 Search Staff</label>
              <input
                type="text"
                placeholder="Name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">💼 Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🟢 Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All' : status === 'active' ? 'Active' : 'On Leave'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">🔽 Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
              >
                <option value="name">Name</option>
                <option value="sessions">Sessions</option>
                <option value="rating">Rating</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div className="space-y-4">
          {filteredAndSortedStaff.map((s) => (
            <div
              key={s.id}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] cursor-pointer group"
              onClick={() => openModal(s)}
            >
              <div className="flex items-center justify-between">
                {/* Left: Avatar & Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                    {s.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition">
                      {s.name}
                    </h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-sm text-gray-500">
                      <span>💼 {s.role}</span>
                      <span>•</span>
                      <span>📅 {s.weeklyHours} hrs/week</span>
                      <span>•</span>
                      <span>💰 {s.revenue}</span>
                    </div>
                  </div>
                </div>

                {/* Center: Stats */}
                <div className="flex items-center gap-6 text-center hidden md:flex">
                  <div>
                    <div className="text-sm text-gray-500">Sessions</div>
                    <div className="font-bold text-gray-800">{s.sessions}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Rating</div>
                    <div className="font-bold text-emerald-600">{s.rating}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Clients</div>
                    <div className="font-bold text-gray-800">{s.clients}</div>
                  </div>
                </div>

                {/* Right: Status & Actions */}
                <div className="flex items-center gap-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      s.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}
                  >
                    {s.status === 'active' ? '🟢 Active' : '🟡 On Leave'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(s);
                    }}
                    className="bg-primary hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition transform-hover"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Weekly Performance Bar */}
              <div className="mt-4 pt-3 border-t border-white/20">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Weekly Sessions</span>
                  <span>{s.performance.filter(Boolean).length} days</span>
                </div>
                <div className="flex gap-1 h-6">
                  {s.performance.map((sessions, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gray-200 rounded relative group"
                      style={{ height: '100%' }}
                      title={`${sessions} sessions on ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}`}
                    >
                      <div
                        className="h-full bg-gradient-to-t from-blue-500 to-emerald-500 rounded transition-all duration-500 ease-out"
                        style={{ height: `${(sessions / 10) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 text-sm text-gray-600">
          <p>
            Showing{' '}
            <span className="font-bold">{filteredAndSortedStaff.length}</span> of{' '}
            <span className="font-bold">{staff.length}</span> staff •{' '}
            <span className="font-medium text-emerald-600">
              {staff.filter((s) => s.status === 'active').length} active
            </span>
          </p>
        </div>
      </div>

      {/* === Staff Detail Modal === */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/30 max-h-screen overflow-y-auto transform hover:scale-[1.01] transition">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                  {selectedStaff.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedStaff.name}</h2>
                  <p className="text-gray-600">{selectedStaff.role}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">📅 Availability</h3>
                <p className="text-gray-600">{selectedStaff.availability}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">💰 Revenue Generated</h3>
                <p className="text-gray-600">{selectedStaff.revenue}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🏆 Certifications</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedStaff.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">⏱ Weekly Hours</h3>
                <p className="text-gray-600">{selectedStaff.weeklyHours} hrs</p>
              </div>
            </div>

            {/* Weekly Performance Chart */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">📈 Weekly Performance</h3>
              <div className="flex gap-1 h-10">
                {selectedStaff.performance.map((sessions, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gray-200 rounded relative group"
                    title={`${sessions} sessions on ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}`}
                  >
                    <div
                      className="h-full bg-gradient-to-t from-blue-500 to-emerald-500 rounded transition-all duration-500 ease-out"
                      style={{ height: `${(sessions / 10) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <span key={i}>{day}</span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-primary hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition shadow-md">
                ✉️ Message
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition">
                📅 Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}