import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, checkAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, profileImage: selectedImage }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
        return;
      }

      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          Create a new account on <span className="text-[#0366fc]">Placay</span>
        </h2>
        <div className="text-sm font-normal mb-4 text-center text-black">Sign up for free</div>
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
        <form className="flex flex-col gap-3" onSubmit={handleRegister}>
          <div className="block relative">          
          <div className="mt-4 mb-4">
            <label className="block text-black text-sm mb-2">Choose a profile picture</label>
            <div className="flex justify-between gap-2">
              {['Prof1.jpg', 'Prof6.jpg', 'Prof4.jpg', 'Prof8.jpg'].map((img) => (
                <img
                key={img}
                src={`/asserts/images/profilePictures/${img}`}
                alt={img}
                className={`w-20 h-20 rounded-full cursor-pointer ${selectedImage === img ? 'border-2 border-blue-500' : ''}`}
                style={{ objectFit: 'cover' }}
                onClick={() => setSelectedImage(img)}
              />              
              ))}
            </div>            
          </div>
            <label htmlFor="name" className="block text-black cursor-text text-sm leading-[140%] font-normal mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-500 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            />
          </div>
          <div className="block relative">
            <label htmlFor="email" className="block text-black cursor-text text-sm leading-[140%] font-normal mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-gray-500 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            />
          </div>
          <div className="block relative">
            <label htmlFor="password" className="block text-black cursor-text text-sm leading-[140%] font-normal mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="bg-gray-500 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150 w-max m-auto cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="text-sm text-center mt-[1.6rem] text-black">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in here!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
