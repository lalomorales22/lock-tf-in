import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Timer, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AppSelector from '../components/AppSelector';
import TimerSelector from '../components/TimerSelector';

const Home = () => {
  const navigate = useNavigate();
  const { selectedApps, startSession } = useAppContext();
  const [error, setError] = useState('');

  const handleStartSession = () => {
    if (selectedApps.length === 0) {
      setError('Please select at least one app to focus on');
      return;
    }
    
    setError('');
    startSession();
    navigate('/focus-session');
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="mb-6 text-center">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">LockTFin</h1>
        <p className="text-gray-600 mt-1">Focus on what matters, lock out distractions</p>
      </div>

      <AppSelector />
      <TimerSelector />

      {error && (
        <div className="mt-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleStartSession}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium flex items-center justify-center transition-colors shadow-sm"
      >
        <Timer className="w-5 h-5 mr-2" />
        Start Focus Session
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>You'll be locked into these apps for the duration.</p>
        <p className="mt-1">Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘ + ⌥ + ⇧ + E</kbd> to exit early if needed</p>
      </div>
    </div>
  );
};

export default Home;