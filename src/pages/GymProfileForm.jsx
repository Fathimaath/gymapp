import { useState } from 'react';

export default function GymProfileForm() {
  const [formData, setFormData] = useState({
    gymName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    facilities: [],
    amenities: [],
    classTypes: [],
    membershipPlans: [
      { type: 'Monthly', price: '' },
      { type: 'Annual', price: '' },
      { type: 'Drop-in', price: '' }
    ],
    hours: {
      Mon: '', Tue: '', Wed: '', Thu: '', Fri: '', Sat: '', Sun: ''
    },
    photos: [],
    website: '',
    socialLinks: { instagram: '', facebook: '', youtube: '' }
  });

  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Facilities, Amenities, Class Types
  const facilitiesOptions = ['Free Weights', 'Cardio Machines', 'Functional Training', 'Pool', 'Sauna', 'Locker Rooms'];
  const amenitiesOptions = ['Towels', 'Parking', 'Wi-Fi', 'Showers', 'Cafe', 'Childcare'];
  const classTypesOptions = ['Yoga', 'HIIT', 'CrossFit', 'Pilates', 'Zumba', 'Spin', 'Strength'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name.startsWith('facilities')) {
      const facility = name.split('-')[1];
      setFormData((prev) => ({
        ...prev,
        facilities: checked
          ? [...prev.facilities, facility]
          : prev.facilities.filter(f => f !== facility)
      }));
    } else if (type === 'checkbox' && name.startsWith('amenities')) {
      const amenity = name.split('-')[1];
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, amenity]
          : prev.amenities.filter(a => a !== amenity)
      }));
    } else if (type === 'checkbox' && name.startsWith('classTypes')) {
      const classType = name.split('-')[1];
      setFormData((prev) => ({
        ...prev,
        classTypes: checked
          ? [...prev.classTypes, classType]
          : prev.classTypes.filter(c => c !== classType)
      }));
    } else if (name.startsWith('membershipPlans.')) {
      const [_, index, field] = name.split('.');
      const newPlans = [...formData.membershipPlans];
      newPlans[index][field] = value;
      setFormData((prev) => ({ ...prev, membershipPlans: newPlans }));
    } else if (name.startsWith('hours.')) {
      const day = name.split('.')[1];
      setFormData((prev) => ({ ...prev, hours: { ...prev.hours, [day]: value } }));
    } else if (name === 'photos') {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, photos: files }));
      // Create previews
      const previews = files.map(file => URL.createObjectURL(file));
      setPhotoPreviews(previews);
    } else if (name.startsWith('socialLinks.')) {
      const socialField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [socialField]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.gymName.trim()) newErrors.gymName = 'Gym name is required';
    if (!formData.ownerName.trim()) newErrors.ownerName = 'Owner name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.description.trim() || formData.description.length < 50) {
      newErrors.description = 'Description is required (min 50 characters)';
    }
    if (formData.facilities.length === 0) newErrors.facilities = 'Select at least one facility';
    if (formData.photos.length === 0) newErrors.photos = 'Upload at least one photo of the gym';

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
        console.log('Gym Profile Data:', formData);
        alert('✅ Gym profile saved! Your gym is now live on the platform.');
        // Redirect to gym dashboard
        window.location.href = '/gym/dashboard';
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 text-center">
          <div className="text-4xl mb-2">🏢</div>
          <h1 className="text-2xl font-bold">Complete Your Gym Profile</h1>
          <p className="text-indigo-100">Attract members with a professional gym listing</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Gym & Owner Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gymName" className="block text-sm font-medium text-gray-700 mb-1">
                Gym Name
              </label>
              <input
                id="gymName"
                name="gymName"
                type="text"
                value={formData.gymName}
                onChange={handleChange}
                className={`w-full border ${errors.gymName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Elite Fitness Center"
              />
              {errors.gymName && <p className="text-red-500 text-xs mt-1">{errors.gymName}</p>}
            </div>

            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                Owner/Manager Name
              </label>
              <input
                id="ownerName"
                name="ownerName"
                type="text"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Jane Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="contact@elitefit.com"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          {/* Address & Location */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <div className="md:col-span-2">
    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
      Street Address
    </label>
    <input
      id="address"
      name="address"
      type="text"
      value={formData.address}
      onChange={handleChange}
      className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      placeholder="123 Fitness St"
    />
    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
  </div>
  <div>
    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
      City
    </label>
    <input
      id="city"
      name="city"
      type="text"
      value={formData.city}
      onChange={handleChange}
      className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      placeholder="New York"
    />
    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
  </div>
  <div>
    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
      State
    </label>
    <input
      id="state"
      name="state"
      type="text"
      value={formData.state}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="NY"
    />
  </div>
  <div>
    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
      ZIP Code
    </label>
    <input
      id="zipCode"
      name="zipCode"
      type="text"
      value={formData.zipCode}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder="10001"
    />
  </div>
</div>

{/* Set Location Button */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Gym Location</label>
  <button
    type="button"
    onClick={() => {
      const address = encodeURIComponent(
        `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`
      );
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }}
    disabled={!formData.address || !formData.city}
    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
  >
    🌍 Set Location on Google Maps
  </button>
  <p className="text-gray-500 text-xs mt-1">
    Click to open the address in Google Maps. Verify or adjust the pin.
  </p>
</div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Gym Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              placeholder="Tell members about your gym's culture, mission, training philosophy, and what makes you unique..."
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Facilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Facilities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {facilitiesOptions.map((facility) => (
                <label key={facility} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={`facilities-${facility}`}
                    checked={formData.facilities.includes(facility)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{facility}</span>
                </label>
              ))}
            </div>
            {errors.facilities && <p className="text-red-500 text-xs mt-1">{errors.facilities}</p>}
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenitiesOptions.map((amenity) => (
                <label key={amenity} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={`amenities-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Class Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Class Types Offered</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {classTypesOptions.map((classType) => (
                <label key={classType} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={`classTypes-${classType}`}
                    checked={formData.classTypes.includes(classType)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{classType}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Membership Plans */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Membership Plans</label>
            <div className="space-y-3">
              {formData.membershipPlans.map((plan, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={plan.type}
                    disabled
                    className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                  />
                  <input
                    type="number"
                    name={`membershipPlans.${index}.price`}
                    value={plan.price}
                    onChange={handleChange}
                    placeholder="Price ($)"
                    className="w-2/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Operating Hours</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.keys(formData.hours).map((day) => (
                <div key={day}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{day}</label>
                  <input
                    type="text"
                    name={`hours.${day}`}
                    value={formData.hours[day]}
                    onChange={handleChange}
                    placeholder="9AM-8PM"
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Gym Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition">
              <input
                type="file"
                name="photos"
                onChange={handleChange}
                multiple
                accept="image/*"
                className="hidden"
                id="gym-photos-upload"
              />
              <label
                htmlFor="gym-photos-upload"
                className="cursor-pointer"
              >
                <div className="text-2xl mb-2">📷</div>
                <p className="text-gray-600 text-sm">
                  Click to upload or drag & drop
                </p>
                <p className="text-gray-500 text-xs mt-1">Recommended: 3+ high-quality images</p>
              </label>
            </div>
            {errors.photos && <p className="text-red-500 text-xs mt-1">{errors.photos}</p>}

            {/* Photo Previews */}
            {photoPreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photoPreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Website & Social */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Online Presence</label>
            <div className="space-y-3">
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourgym.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="url"
                name="socialLinks.instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/yourgym"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="url"
                name="socialLinks.facebook"
                value={formData.socialLinks.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourgym"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="url"
                name="socialLinks.youtube"
                value={formData.socialLinks.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/yourgym"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
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
                'Publish Gym Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}