import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup
  const [showRoleSelection, setShowRoleSelection] = useState(false); // Show role screen after login
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    authenticatedUser: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]); // Simulated DB
  const [loginError, setLoginError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Sign Up
  const validateSignUp = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Login
  const validateLogin = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    if (validateSignUp()) {
      setLoading(true);
      setTimeout(() => {
        // Simulate saving to DB
        setRegisteredUsers([
          ...registeredUsers,
          { email: formData.email, password: formData.password, name: formData.name }
        ]);
        setLoading(false);
        alert(`✅ Account created for ${formData.name}! You can now log in.`);
        setIsLogin(true); // Switch to login tab
        setFormData((prev) => ({
          ...prev,
          password: '',
          confirmPassword: '',
          name: '',
        }));
        setErrors({});
      }, 1500);
    }
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      setLoading(true);
      setTimeout(() => {
        // Simulate check against "database"
        const user = registeredUsers.find(
          (u) => u.email === formData.email && u.password === formData.password
        );

        if (user) {
          setFormData((prev) => ({ ...prev, authenticatedUser: user }));
          setShowRoleSelection(true); // Show role selection
          setLoginError('');
        } else {
          setLoginError('❌ Invalid email or password. Please sign up first.');
        }
        setLoading(false);
      }, 1000);
    }
  };

  // Simulate Google Login
  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate successful Google login
      const googleUser = { name: 'Google User', email: 'user@gmail.com' };
      setFormData((prev) => ({ ...prev, authenticatedUser: googleUser }));
      setShowRoleSelection(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Tabs */}
        {!showRoleSelection && (
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setIsLogin(true);
                setLoginError('');
              }}
              className={`flex-1 py-4 text-center font-semibold text-sm transition ${
                isLogin
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setErrors({});
              }}
              className={`flex-1 py-4 text-center font-semibold text-sm transition ${
                !isLogin
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="p-8">
          {/* Role Selection Screen */}
          {showRoleSelection ? (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Who are you?</h2>
              <p className="text-gray-600">Choose your role to continue</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {/* Member Option */}
                <button
                  onClick={() => {
                    window.location.href = '/pages/GymProfileForm'; // Redirect to Member Profile Form
                  }}
                  className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition text-left"
                >
                  <div className="text-4xl mb-2">🧍‍♂️</div>
                  <h3 className="font-semibold text-lg">GYM</h3>
                  <p className="text-gray-500 text-sm">Join Here</p>
                </button>

                {/* Trainer Option */}
                <button
                  onClick={() => {
                    window.location.href = '/pages/TrainerProfileForm'; // Redirect to Trainer Profile Form
                  }}
                  className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition text-left"
                >
                  <div className="text-4xl mb-2">🏋️‍♂️</div>
                  <h3 className="font-semibold text-lg">Trainer</h3>
                  <p className="text-gray-500 text-sm">I want to create workouts</p>
                </button>
              </div>

              {/* Back to Login */}
              <button
                onClick={() => {
                  setShowRoleSelection(false);
                  setIsLogin(true);
                  setLoginError('');
                }}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Back to Login
              </button>
            </div>
          ) : isLogin ? (
            // 🔐 LOGIN FORM
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-center text-gray-500 text-sm mb-6">Sign in to your account</p>

              {loginError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  {loginError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" fill="currentColor"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don’t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          ) : (
            // ✍️ SIGN UP FORM
            <form onSubmit={handleSignUp}>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
              <p className="text-center text-gray-500 text-sm mb-6">Join our fitness community</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" fill="currentColor"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Divider & OAuth Buttons (Only shown when not in role selection) */}
          {!showRoleSelection && (
            <>
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 text-sm text-gray-500">or continue with</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
                >
                  <span>📘</span>
                  <span>Sign in with Facebook</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.073c0-6.627-5.373-12-12-12" />
                  </svg>
                  <span>Sign in with GitHub</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}