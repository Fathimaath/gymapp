// src/pages/Members.jsx
import Sidebar from '../components/Sidebar';
import { useState, useMemo } from 'react';

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Enhanced member data (matches Clients.jsx style)
  const members = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      plan: 'Premium',
      joinDate: '2024-06-15',
      sessionsThisWeek: 3,
      attendance: 94,
      progress: 75,
      lastActive: '2 hours ago',
      status: 'active',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.c@email.com',
      plan: 'Basic',
      joinDate: '2024-07-01',
      sessionsThisWeek: 2,
      attendance: 82,
      progress: 40,
      lastActive: '1 day ago',
      status: 'active',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Lisa Wong',
      email: 'lisa.w@email.com',
      plan: 'Elite',
      joinDate: '2024-05-20',
      sessionsThisWeek: 4,
      attendance: 96,
      progress: 90,
      lastActive: '30 min ago',
      status: 'active',
      avatar: 'LW',
    },
    {
      id: 4,
      name: 'Alex Rivera',
      email: 'alex.r@email.com',
      plan: 'Premium',
      joinDate: '2024-07-10',
      sessionsThisWeek: 1,
      attendance: 68,
      progress: 20,
      lastActive: '5 days ago',
      status: 'inactive',
      avatar: 'AR',
    },
    {
      id: 5,
      name: 'Emma Thompson',
      email: 'emma.t@email.com',
      plan: 'Premium',
      joinDate: '2024-06-05',
      sessionsThisWeek: 3,
      attendance: 90,
      progress: 65,
      lastActive: '4 hours ago',
      status: 'active',
      avatar: 'ET',
    },
    {
      id: 6,
      name: 'David Kim',
      email: 'david.k@email.com',
      plan: 'Basic',
      joinDate: '2024-08-01',
      sessionsThisWeek: 0,
      attendance: 10,
      progress: 10,
      lastActive: '1 week ago',
      status: 'inactive',
      avatar: 'DK',
    },
  ];

  const plans = ['all', 'Elite', 'Premium', 'Basic'];
  const statuses = ['all', 'active', 'inactive'];

  // Filter and Sort Logic
  const filteredAndSortedMembers = useMemo(() => {
    let result = members.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            m.plan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan = filterPlan === 'all' || m.plan === filterPlan;
      const matchesStatus = filterStatus === 'all' || m.status === filterStatus;
      return matchesSearch && matchesPlan && matchesStatus;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'plan':
          return a.plan.localeCompare(b.plan);
        case 'attendance':
          return b.attendance - a.attendance;
        case 'joinDate':
          return new Date(b.joinDate) - new Date(a.joinDate);
        case 'sessions':
          return b.sessionsThisWeek - a.sessionsThisWeek;
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, filterPlan, filterStatus, sortBy]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* ✅ Sidebar */}
      <Sidebar userRole="gym" />

      {/* ✅ Main Content */}
      <div className="ml-64 flex-1 p-6 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👥 Members</h1>
          <p className="text-gray-600 mt-2">Manage your gym members and memberships</p>
        </div>

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">🔍 Search Members</label>
              <input
                type="text"
                placeholder="Name, email, or plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">💼 Plan</label>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
              >
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan === 'all' ? 'All Plans' : plan}
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
                    {status === 'all' ? 'All' : status === 'active' ? 'Active' : 'Inactive'}
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
                <option value="plan">Plan</option>
                <option value="attendance">Attendance</option>
                <option value="joinDate">Join Date</option>
                <option value="sessions">Sessions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/30 border-b border-white/30">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Member</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Plan</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Join Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Sessions</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Progress</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Last Active</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredAndSortedMembers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-16 text-gray-500">
                      <div className="text-5xl mb-4 animate-pulse">🔍</div>
                      <p className="text-lg font-medium">No members found</p>
                      <p className="text-sm">Try adjusting your search or filter.</p>
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedMembers.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-white/30 transition-all duration-200 cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                            {member.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            member.plan === 'Elite'
                              ? 'bg-purple-100 text-purple-800'
                              : member.plan === 'Premium'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {member.plan}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{formatDate(member.joinDate)}</td>
                      <td className="py-4 px-6 font-medium text-gray-800">{member.sessionsThisWeek}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000 ease-out"
                              style={{ width: `${member.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-8">{member.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{member.lastActive}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            member.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {member.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 text-sm text-gray-600">
          <p>
            Showing{' '}
            <span className="font-bold">{filteredAndSortedMembers.length}</span> of{' '}
            <span className="font-bold">{members.length}</span> members •{' '}
            <span className="font-medium text-emerald-600">
              {members.filter((m) => m.status === 'active').length} active
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}