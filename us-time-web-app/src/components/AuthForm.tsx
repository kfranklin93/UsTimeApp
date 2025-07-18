import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import initialized auth from your config
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully!');
        // You might want to automatically create a user profile in Firestore here
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-4xl font-extrabold mb-8 text-blue-700">
        {isLogin ? 'Welcome Back!' : 'Join UsTime'}
      </h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full max-w-md p-4 mb-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-md p-4 mb-6 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />

      <button
        onClick={handleAuth}
        disabled={loading}
        className="w-full max-w-md bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
      </button>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-6 text-blue-600 hover:underline text-md"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default AuthForm;