// src/pages/GymPayments.jsx
import Sidebar from '../components/Sidebar';
import { useState, useMemo } from 'react';
import { FaMoneyCheckAlt, FaClock, FaCreditCard, FaUserCircle, FaUsers, FaChalkboardTeacher, FaSearch, FaFilter, FaFileExport, FaEye } from 'react-icons/fa';

export default function GymPayments({ userRole = 'gym' }) {
  const [filter, setFilter] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'member', 'staff'
  const [sortBy, setSortBy] = useState('date');

  // ✅ Combined Payments: Members & Staff
  const payments = [
    // Member Payments
    { id: 1, name: 'Sarah Johnson', type: 'member', plan: 'Premium', amount: 120, date: '2024-08-20', status: 'paid', method: 'Card', avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', type: 'member', plan: 'Basic', amount: 60, date: '2024-08-18', status: 'paid', method: 'PayPal', avatar: 'MC' },
    { id: 3, name: 'Lisa Wong', type: 'member', plan: 'Premium', amount: 120, date: '2024-08-15', status: 'paid', method: 'Card', avatar: 'LW' },
    { id: 4, name: 'Emma Thompson', type: 'member', plan: 'Premium', amount: 120, date: '2024-08-05', status: 'paid', method: 'Card', avatar: 'ET' },
    { id: 5, name: 'David Kim', type: 'member', plan: 'Basic', amount: 60, date: '2024-07-28', status: 'failed', method: 'Card', avatar: 'DK' },

    // Staff Payments (Payouts)
    { id: 6, name: 'Alex Rivera', type: 'staff', role: 'Strength Coach', amount: 800, date: '2024-08-15', status: 'paid', method: 'Bank Transfer', avatar: 'AR' },
    { id: 7, name: 'Sarah Johnson', type: 'staff', role: 'Lead Trainer', amount: 950, date: '2024-08-15', status: 'paid', method: 'Bank Transfer', avatar: 'SJ' },
    { id: 8, name: 'Mike Chen', type: 'staff', role: 'HIIT Coach', amount: 700, date: '2024-08-15', status: 'paid', method: 'Bank Transfer', avatar: 'MC' },
    { id: 9, name: 'Lisa Wong', type: 'staff', role: 'Yoga Instructor', amount: 750, date: '2024-08-15', status: 'pending', method: 'Bank Transfer', avatar: 'LW' },
  ];

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  // ✅ Filter & Sort Logic
  const filteredAndSortedPayments = useMemo(() => {
    let result = payments.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesType = typeFilter === 'all' || p.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

    // Filter by date
    const now = new Date();
    if (filter === 'this-week') {
      const lastWeek = new Date(now);
      lastWeek.setDate(now.getDate() - 7);
      result = result.filter((p) => new Date(p.date) >= lastWeek);
    } else if (filter === 'this-month') {
      result = result.filter((p) => new Date(p.date).getMonth() === now.getMonth());
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'amount':
          return b.amount - a.amount;
        case 'date':
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

    return result;
  }, [filter, searchTerm, statusFilter, typeFilter, sortBy]);

  // ✅ Calculate Totals
  const totals = useMemo(() => {
    const totalIncome = filteredAndSortedPayments
      .filter((p) => p.type === 'member')
      .reduce((sum, p) => sum + p.amount, 0);

    const totalPayouts = filteredAndSortedPayments
      .filter((p) => p.type === 'staff')
      .reduce((sum, p) => sum + p.amount, 0);

    const netRevenue = totalIncome - totalPayouts;
    const paidIncome = filteredAndSortedPayments
      .filter((p) => p.type === 'member' && p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    return { totalIncome, totalPayouts, netRevenue, paidIncome };
  }, [filteredAndSortedPayments]);

  // ✅ Export to CSV
  const exportToCSV = () => {
    const headers = ['Type', 'Name', 'Plan/Role', 'Amount', 'Date', 'Status', 'Method'];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...filteredAndSortedPayments.map((p) =>
          [
            p.type === 'member' ? 'Member' : 'Staff',
            p.name,
            p.type === 'member' ? p.plan : p.role,
            `$${p.amount}`,
            formatDate(p.date),
            p.status,
            p.method,
          ]
            .map((field) => `"${field}"`)
            .join(',')
        ),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gym-payments-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* ✅ Sidebar */}
      <Sidebar userRole={userRole} />

      {/* ✅ Main Content */}
      <div className="ml-64 flex-1 p-6 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">💳 Payments & Payouts</h1>
          <p className="text-gray-600 mt-2">Track member payments and staff payouts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaMoneyCheckAlt className="text-emerald-500 text-3xl" />}
            label="Member Income"
            value={`$${totals.totalIncome}`}
            change="+8.4% from last month"
            positive
          />
          <StatCard
            icon={<FaChalkboardTeacher className="text-indigo-500 text-3xl" />}
            label="Staff Payouts"
            value={`$${totals.totalPayouts}`}
            change="+3.2% from last month"
          />
          <StatCard
            icon={<FaCreditCard className="text-blue-500 text-3xl" />}
            label="Net Revenue"
            value={`$${totals.netRevenue}`}
            change="+12.1% from last month"
            positive
          />
          <StatCard
            icon={<FaUsers className="text-green-500 text-3xl" />}
            label="Paid Members"
            value={`${payments.filter((p) => p.type === 'member' && p.status === 'paid').length}`}
            change="+5 this week"
            positive
          />
        </div>

        {/* Filters & Controls */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
            <div className="lg:col-span-2 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
            >
              <option value="all">All Types</option>
              <option value="member">Members</option>
              <option value="staff">Staff</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white"
            >
              <option value="all">All Time</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
            <button
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition transform-hover"
            >
              <FaFileExport /> Export CSV
            </button>
          </div>
        </div>

        {/* Sorting */}
        <div className="flex justify-end mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/50 bg-white text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>

        {/* Payments Table */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/30 border-b border-white/30">
                <tr>
                  <Th>Type</Th>
                  <Th>Name</Th>
                  <Th>Plan / Role</Th>
                  <Th>Amount</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th>Method</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredAndSortedPayments.length ? (
                  filteredAndSortedPayments.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-white/40 transition-all duration-200 cursor-pointer group"
                    >
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            p.type === 'member'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {p.type === 'member' ? '👤 Member' : '👨‍🏫 Staff'}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          {p.avatar}
                        </div>
                        {p.name}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{p.type === 'member' ? p.plan : p.role}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800">${p.amount}</td>
                      <td className="py-4 px-6 text-gray-600">{formatDate(p.date)}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            p.status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.status === 'pending'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.status === 'paid' && '✅ Paid'}
                          {p.status === 'pending' && '⏳ Pending'}
                          {p.status === 'failed' && '❌ Failed'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{p.method}</td>
                      <td className="py-4 px-6">
                        <button className="text-primary hover:text-emerald-600 transition">
                          <FaEye className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-500">
                      <div className="text-5xl mb-4 animate-pulse">🔍</div>
                      <p className="text-lg font-medium">No payments found</p>
                      <p className="text-sm">Try adjusting your filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 text-sm text-gray-600">
          Showing <span className="font-bold">{filteredAndSortedPayments.length}</span> of{' '}
          <span className="font-bold">{payments.length}</span> transactions •{' '}
          <span className="font-medium text-emerald-600">
            {payments.filter((p) => p.status === 'paid').length} paid
          </span>
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable Components
const StatCard = ({ icon, label, value, change, positive = false }) => (
  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 text-center transform-hover">
    <div className="flex items-center justify-center mb-3">{icon}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
    {change && (
      <div
        className={`text-xs mt-1 ${positive ? 'text-emerald-600' : 'text-gray-500'} font-medium`}
      >
        {change}
      </div>
    )}
  </div>
);

const Th = ({ children }) => (
  <th className="text-left py-4 px-6 font-semibold text-gray-700">{children}</th>
);