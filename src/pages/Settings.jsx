// src/pages/Settings.jsx
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showToast, setShowToast] = useState(false);

  // ✅ State for General Settings
  const [studioInfo, setStudioInfo] = useState({
    name: 'Urban Fit Studio',
    location: 'Downtown, New York',
    email: 'hello@urbanfit.com',
    phone: '+1 (555) 123-4567',
    website: 'www.urbanfit.com',
  });

  // ✅ State for Membership Plans
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic',
      price: 60,
      interval: 'monthly',
      description: 'Access to gym only',
      benefits: ['24/7 Gym Access', 'Locker Room', 'Free Wi-Fi'],
      enabled: true,
      autoRenew: true,
    },
    {
      id: 2,
      name: 'Premium',
      price: 120,
      interval: 'monthly',
      description: 'Gym + 4 classes/month',
      benefits: ['All Basic Features', '4 Group Classes', 'Nutrition Guide'],
      enabled: true,
      autoRenew: true,
    },
    {
      id: 3,
      name: 'Elite',
      price: 200,
      interval: 'monthly',
      description: 'Unlimited classes + personal training',
      benefits: ['All Premium Features', 'Unlimited Classes', '1 Personal Session/month'],
      enabled: true,
      autoRenew: true,
    },
  ]);

  // ✅ State for Notifications
  const [notifications, setNotifications] = useState({
    email: {
      payment: true,
      classReminder: true,
      newsletter: false,
    },
    sms: {
      payment: false,
      classReminder: true,
      newsletter: false,
    },
  });

  // ✅ State for Integrations
  const [integrations, setIntegrations] = useState({
    googleCalendar: false,
    stripe: true,
    mailchimp: false,
    zoom: false,
  });

  // ✅ Handle Save
  const handleSave = () => {
    // In real app: API call
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ✅ Handle Reset
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      setStudioInfo({
        name: 'Urban Fit Studio',
        location: 'Downtown, New York',
        email: 'hello@urbanfit.com',
        phone: '+1 (555) 123-4567',
        website: 'www.urbanfit.com',
      });
      setPlans((prev) =>
        prev.map((p) => ({
          ...p,
          price: p.name === 'Basic' ? 60 : p.name === 'Premium' ? 120 : 200,
          autoRenew: true,
        }))
      );
      setNotifications({
        email: { payment: true, classReminder: true, newsletter: false },
        sms: { payment: false, classReminder: true, newsletter: false },
      });
      setIntegrations({
        googleCalendar: false,
        stripe: true,
        mailchimp: false,
        zoom: false,
      });
      setShowToast(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* ✅ Sidebar */}
      <Sidebar userRole="gym" />

      {/* ✅ Main Content */}
      <div className="ml-64 flex-1 p-6 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">⚙️ Settings</h1>
          <p className="text-gray-600 mt-2">Configure your studio preferences, plans, and integrations</p>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-sm p-1 rounded-3xl shadow-xl border border-white/30 mb-8 inline-flex">
          {[
            { id: 'general', label: 'General', icon: '🏢' },
            { id: 'plans', label: 'Membership Plans', icon: '💳' },
            { id: 'notifications', label: 'Notifications', icon: '🔔' },
            { id: 'integrations', label: 'Integrations', icon: '🔌' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-3xl font-medium transition text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-emerald-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
          {/* === General Tab === */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">🏢 Studio Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Studio Name</label>
                  <input
                    type="text"
                    value={studioInfo.name}
                    onChange={(e) => setStudioInfo({ ...studioInfo, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={studioInfo.location}
                    onChange={(e) => setStudioInfo({ ...studioInfo, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={studioInfo.email}
                    onChange={(e) => setStudioInfo({ ...studioInfo, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={studioInfo.phone}
                    onChange={(e) => setStudioInfo({ ...studioInfo, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input
                    type="url"
                    value={studioInfo.website}
                    onChange={(e) => setStudioInfo({ ...studioInfo, website: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* === Membership Plans Tab === */}
          {activeTab === 'plans' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">💳 Membership Plans</h3>
              <p className="text-gray-600 text-sm mb-4">Manage pricing, benefits, and renewal settings.</p>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-medium">${plan.price}/mo</span>
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={plan.enabled}
                              onChange={() =>
                                setPlans((prev) =>
                                  prev.map((p) => (p.id === plan.id ? { ...p, enabled: !p.enabled } : p))
                                )
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-6 rounded-full transition ${plan.enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
                            ></div>
                            <div
                              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                                plan.enabled ? 'translate-x-4' : ''
                              }`}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">Active</span>
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($/month)</label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) =>
                          setPlans((prev) =>
                            prev.map((p) => (p.id === plan.id ? { ...p, price: Number(e.target.value) } : p))
                          )
                        }
                        className="w-32 border border-gray-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        value={plan.description}
                        onChange={(e) =>
                          setPlans((prev) =>
                            prev.map((p) => (p.id === plan.id ? { ...p, description: e.target.value } : p))
                          )
                        }
                        className="w-full border border-gray-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                      <div className="space-y-1">
                        {plan.benefits.map((benefit, i) => (
                          <input
                            key={i}
                            type="text"
                            value={benefit}
                            onChange={(e) => {
                              const newBenefits = [...plan.benefits];
                              newBenefits[i] = e.target.value;
                              setPlans((prev) =>
                                prev.map((p) => (p.id === plan.id ? { ...p, benefits: newBenefits } : p))
                              );
                            }}
                            className="w-full border border-gray-300 rounded-xl px-3 py-1.5 text-sm focus:outline-none"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={plan.autoRenew}
                            onChange={() =>
                              setPlans((prev) =>
                                prev.map((p) => (p.id === plan.id ? { ...p, autoRenew: !p.autoRenew } : p))
                              )
                            }
                            className="sr-only"
                          />
                          <div
                            className={`w-10 h-6 rounded-full transition ${plan.autoRenew ? 'bg-blue-500' : 'bg-gray-300'}`}
                          ></div>
                          <div
                            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                              plan.autoRenew ? 'translate-x-4' : ''
                            }`}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">Auto Renewal</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === Notifications Tab === */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">🔔 Notification Preferences</h3>
              <p className="text-gray-600 text-sm mb-4">Choose how you and your members are notified.</p>
              <div className="space-y-5">
                {Object.keys(notifications).map((channel) => (
                  <div key={channel} className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-800 capitalize mb-3">{channel} Notifications</h4>
                    {Object.keys(notifications[channel]).map((type) => (
                      <div key={type} className="flex items-center justify-between py-2">
                        <span className="text-gray-700">
                          {type === 'payment' && 'Payment Confirmation'}
                          {type === 'classReminder' && 'Class Reminder (1h before)'}
                          {type === 'newsletter' && 'Weekly Newsletter'}
                        </span>
                        <label className="flex items-center cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notifications[channel][type]}
                              onChange={() =>
                                setNotifications((prev) => ({
                                  ...prev,
                                  [channel]: {
                                    ...prev[channel],
                                    [type]: !prev[channel][type],
                                  },
                                }))
                              }
                              className="sr-only"
                            />
                            <div
                              className={`w-10 h-6 rounded-full transition ${
                                notifications[channel][type] ? 'bg-emerald-500' : 'bg-gray-300'
                              }`}
                            ></div>
                            <div
                              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                                notifications[channel][type] ? 'translate-x-4' : ''
                              }`}
                            ></div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === Integrations Tab === */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">🔌 Connected Apps</h3>
              <p className="text-gray-600 text-sm mb-4">Sync your studio with your favorite tools.</p>
              <div className="space-y-4">
                {[
                  { id: 'googleCalendar', name: 'Google Calendar', desc: 'Sync your schedule', logo: '📅' },
                  { id: 'stripe', name: 'Stripe', desc: 'Process payments', logo: '💳' },
                  { id: 'mailchimp', name: 'Mailchimp', desc: 'Email marketing', logo: '✉️' },
                  { id: 'zoom', name: 'Zoom', desc: 'Host virtual classes', logo: '🎥' },
                ].map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{app.logo}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">{app.name}</h4>
                        <p className="text-sm text-gray-500">{app.desc}</p>
                      </div>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={integrations[app.id]}
                          onChange={() =>
                            setIntegrations((prev) => ({ ...prev, [app.id]: !prev[app.id] }))
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-10 h-6 rounded-full transition ${
                            integrations[app.id] ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
                            integrations[app.id] ? 'translate-x-4' : ''
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2.5 rounded-xl font-medium transition shadow-md transform-hover"
          >
            💾 Save Changes
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-xl font-medium transition transform-hover"
          >
            🔄 Reset to Default
          </button>
        </div>
      </div>

      {/* ✅ Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <span>✅</span> Settings saved successfully!
        </div>
      )}
    </div>
  );
}