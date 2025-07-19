import React, { useState } from 'react';
import { functions } from '../firebaseConfig'; // Import initialized functions
import { httpsCallable } from 'firebase/functions';

const CommunicationTranslator: React.FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestions = async (feeling: string) => {
    setLoading(true);
    setError(null);
    setSuggestions([]); // Clear previous suggestions
    try {
      // Get a reference to the callable function
      const getCommunicationSuggestionCallable = httpsCallable(functions, 'getCommunicationSuggestion');

      // Call the Firebase Cloud Function
      const result = await getCommunicationSuggestionCallable({ feeling: feeling });
      const data = result.data as { suggestions: string[] }; // Cast to expected type
      setSuggestions(data.suggestions);
    } catch (err: any) {
      console.error("Error getting communication suggestions:", err);
      setError(`Could not get suggestions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-md max-w-xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Communication Translator</h2>
      <p className="text-gray-600 text-center mb-6">Select how you feel to get gentle communication suggestions.</p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => getSuggestions('sad')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-md"
        >
          I feel Sad 😞
        </button>
        <button
          onClick={() => getSuggestions('anxious')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-md"
        >
          I feel Anxious 😟
        </button>
        <button
          onClick={() => getSuggestions('happy')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-md"
        >
          I feel Happy 😊
        </button>
        <button
          onClick={() => getSuggestions('frustrated')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300 shadow-md"
        >
          I feel Frustrated 😠
        </button>
      </div>

      {loading && (
        <p className="text-center text-blue-600 text-lg">Generating suggestions...</p>
      )}
      {error && (
        <p className="text-center text-red-500 text-md">{error}</p>
      )}

      {suggestions.length > 0 && (
        <div className="mt-8 border border-blue-200 rounded-xl p-6 bg-blue-50 shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Suggested phrases:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-gray-700 leading-relaxed">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommunicationTranslator;