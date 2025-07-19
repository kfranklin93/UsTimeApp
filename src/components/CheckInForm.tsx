import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig'; // Import initialized db, auth
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface CheckInFormProps {
  currentUser: User | null; // Pass the current logged-in user
}

const CheckInForm: React.FC<CheckInFormProps> = ({ currentUser }) => {
  const [mood, setMood] = useState(50); // 0-100 slider value
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSaveCheckIn = async () => {
    if (!currentUser) {
      setMessage('Error: You must be logged in to check-in.');
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      await addDoc(collection(db, 'checkIns'), {
        userId: currentUser.uid,
        mood: mood,
        note: note,
        timestamp: serverTimestamp(),
        // You might add a 'partnerId' later if you store couple relationships
      });
      setMessage('Check-in saved successfully!');
      setNote(''); // Clear note after saving
    } catch (error: any) {
      setMessage('Failed to save check-in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (value: number) => {
    if (value < 20) return '😞';
    if (value < 40) return '😟';
    if (value < 60) return '😐';
    if (value < 80) return '😊';
    return '😁';
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl max-w-2xl mx-auto my-10">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Daily Emotional Check-In
      </h2>

      <div className="mb-8 w-full flex flex-col items-center">
        <div className="text-7xl mb-4 animate-bounce-in">{getMoodEmoji(mood)}</div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
          style={{ '--tw-ring-color': '#3B82F6', '--tw-ring-offset-color': '#fff' }}
        />
        <p className="text-lg text-gray-600 mt-4">Mood: {mood}%</p>
      </div>

      <label htmlFor="note" className="self-start text-lg font-semibold mb-2 text-gray-700">
        Add a note (optional):
      </label>
      <textarea
        id="note"
        placeholder="What's on your mind today?"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-4 h-32 mb-8 border border-gray-300 rounded-lg bg-gray-50 shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
      />

      <button
        onClick={handleSaveCheckIn}
        disabled={loading || !currentUser}
        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
      >
        {loading ? 'Saving...' : 'Save Check-In'}
      </button>

      {message && (
        <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CheckInForm;