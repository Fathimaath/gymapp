// src/pages/Profile.jsx
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    title: 'Certified Personal Trainer',
    bio: 'Helping clients build strength, confidence, and long-term health through personalized training and nutrition guidance.',
    email: 'alex.rivera@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Downtown Gym, New York, NY',
    specialties: ['Strength Training', 'HIIT', 'Nutrition Coaching'],
    certifications: ['NASM-CPT', 'ACE Health Coach', 'CrossFit Level 1'],
    experience: '8 years',
    availability: 'Mon-Fri 6AM-8PM, Sat 8AM-2PM',
    social: {
      instagram: '@alex_trainstrue',
      website: 'alextrainstrue.com',
    },
    photo: null,
    photoPreview: 'https://via.placeholder.com/150', // Replace with real avatar
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // In real app: API call
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'specialties' || name === 'certifications') {
      setFormData({
        ...formData,
        [name]: value.split(',').map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, photoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('photo-upload').click();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* ✅ Sidebar */}
      <Sidebar userRole="trainer" />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">👤 Your Profile</h1>
          <p className="text-gray-600 mt-2">Manage your public trainer profile and credentials</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden mb-8">
          {/* Cover Photo */}
          <div className="h-40 bg-gradient-to-r from-blue-500 to-emerald-600 relative">
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-xl text-sm font-medium shadow-lg transition transform-hover"
            >
              ✏️ Edit Profile
            </button>
          </div>

          {/* Avatar & Info */}
          <div className="px-8 pb-8 relative -mt-16">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden cursor-pointer transform-hover"
                onClick={triggerFileInput}
              >
                <img
                  src={formData.photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-lg text-black-600 font-medium">{formData.title}</p>
                <p className="text-gray-600 mt-2 leading-relaxed max-w-2xl">{formData.bio}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-gray-800">8+ yrs</div>
                    <div className="text-gray-500">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">120+</div>
                    <div className="text-gray-500">Clients Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">5.0 ⭐</div>
                    <div className="text-gray-500">Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Info */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
            <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Personal Information</h3>
            <div className="space-y-5">
              {[
                { label: 'Email', value: formData.email, icon: '📧' },
                { label: 'Phone', value: formData.phone, icon: '📞' },
                { label: 'Location', value: formData.location, icon: '📍' },
                { label: 'Availability', value: formData.availability, icon: '⏰' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-medium text-gray-700">{item.label}</p>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-3">🎯 Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-emerald-600 text-white rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-800 mb-3">📜 Certifications</h4>
              <div className="space-y-2">
                {formData.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="text-sm text-gray-700 p-2 bg-gray-50 rounded-lg"
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social & Actions */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30">
            <h3 className="text-xl font-bold text-gray-800 mb-6">🔗 Social & Links</h3>
            <div className="space-y-4">
              {[
                { label: 'Instagram', value: formData.social.instagram, icon: '📸', color: 'from-pink-500 to-rose-500' },
                { label: 'Website', value: formData.social.website, icon: '🌐', color: 'from-blue-500 to-indigo-600' },
              ].map((social, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-white to-gray-50 rounded-xl hover:from-blue-50 hover:to-white transition cursor-pointer group transform-hover"
                >
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center text-white text-sm shadow-lg`}
                  >
                    {social.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{social.label}</p>
                    <p className="text-sm text-gray-600">{social.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleEdit}
                className="w-full bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-xl font-semibold transition shadow-md transform-hover"
              >
                ✏️ Edit Profile
              </button>
              <button
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition transform-hover"
              >
                📄 View Public Profile
              </button>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/30 text-sm text-gray-600">
          <p>
            Your profile is{' '}
            <span className="font-bold text-emerald-600">publicly visible</span> to clients. Keep it updated to build trust and attract new clients.
          </p>
        </div>
      </div>

      {/* === Edit Profile Modal === */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/30 max-h-screen overflow-y-auto transform hover:scale-[1.01] transition">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">✏️ Edit Profile</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="e.g. Mon-Fri 6AM-8PM"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialties (comma-separated)</label>
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties.join(', ')}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certifications (comma-separated)</label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications.join(', ')}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Handle</label>
                <input
                  type="text"
                  name="social.instagram"
                  value={formData.social.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      social: { ...formData.social, instagram: e.target.value },
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  name="social.website"
                  value={formData.social.website}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      social: { ...formData.social, website: e.target.value },
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-3 focus:ring-blue-500/50"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white py-3 rounded-xl font-semibold transition shadow-md"
              >
                Save Changes
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}