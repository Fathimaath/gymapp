import { useState } from 'react';

export default function TrainerProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    certifications: '',
    bio: '',
    hourlyRate: '',
    availability: [],
    photo: null,
    socialLinks: { instagram: '', facebook: '', website: '' },
  });
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const specialties = [
    'Strength Training',
    'Weight Loss',
    'Bodybuilding',
    'Yoga & Mobility',
    'Rehab & Recovery',
    'HIIT & Conditioning',
    'Nutrition Coaching',
    'Group Classes',
  ];

  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Elite'];

  const weeklyAvailability = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'availability') {
      setFormData((prev) => ({
        ...prev,
        availability: checked
          ? [...prev.availability, value]
          : prev.availability.filter((day) => day !== value),
      }));
    } else if (name.startsWith('socialLinks.')) {
      const socialField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialField]: value },
      }));
    } else if (name === 'photo') {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, photo: file }));
        setPhotoPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.specialty) newErrors.specialty = 'Specialty is required';
    if (!formData.experience) newErrors.experience = 'Experience level is required';
    if (!formData.certifications.trim()) newErrors.certifications = 'Certifications are required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required (min 50 characters)';
    if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
    if (formData.availability.length === 0) newErrors.availability = 'Select at least one available day';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        console.log('Trainer Profile Data:', formData);
        alert('✅ Trainer profile saved! Your profile is now live.');
        // Redirect to trainer dashboard
        window.location.href = '/trainer/dashboard';
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 text-center">
          <div className="text-4xl mb-2">🏋️‍♂️</div>
          <h1 className="text-2xl font-bold">Complete Your Trainer Profile</h1>
          <p className="text-emerald-100">Showcase your expertise and attract clients</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Profile Photo */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-3">Profile Photo</label>
            <div
              className={`w-28 h-28 mx-auto rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-dashed ${
                photoPreview ? 'border-primary' : 'border-gray-300'
              } cursor-pointer hover:border-primary/50 transition`}
              onClick={() => document.getElementById('photo-upload').click()}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">📷</span>
              )}
            </div>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleChange}
              className="hidden"
            />
            <p className="text-gray-500 text-xs mt-2">Click to upload or drag & drop</p>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className={`w-full border ${errors.specialty ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                <option value="">Select Specialty</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              {errors.specialty && <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>}
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                <option value="">Select Level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
            </div>

            <div>
              <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate ($)
              </label>
              <input
                id="hourlyRate"
                name="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={handleChange}
                className={`w-full border ${errors.hourlyRate ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="50"
              />
              {errors.hourlyRate && <p className="text-red-500 text-xs mt-1">{errors.hourlyRate}</p>}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
              Certifications (e.g., NASM, ACE, ISSA)
            </label>
            <input
              id="certifications"
              name="certifications"
              type="text"
              value={formData.certifications}
              onChange={handleChange}
              className={`w-full border ${errors.certifications ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              placeholder="NASM, ACE, CPR Certified"
            />
            {errors.certifications && <p className="text-red-500 text-xs mt-1">{errors.certifications}</p>}
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Your Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className={`w-full border ${errors.bio ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              placeholder="Tell clients about your journey, philosophy, training style, and what makes you unique..."
            ></textarea>
            {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio}</p>}
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Available Days</label>
            <div className="flex flex-wrap gap-2">
              {weeklyAvailability.map((day) => (
                <label key={day} className="cursor-pointer">
                  <input
                    type="checkbox"
                    name="availability"
                    value={day}
                    checked={formData.availability.includes(day)}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium text-sm transition ${
                      formData.availability.includes(day)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.slice(0, 1)}
                  </div>
                </label>
              ))}
            </div>
            {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Social Media & Website</label>
            <div className="space-y-3">
              <input
                type="url"
                name="socialLinks.website"
                value={formData.socialLinks.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="url"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/yourhandle"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="url"
                name="socialLinks.facebook"
                value={formData.socialLinks.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving Profile...
                </>
              ) : (
                'Publish Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}