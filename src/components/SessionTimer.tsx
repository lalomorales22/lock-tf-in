import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { Timer, X } from 'lucide-react';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const SessionTimer = () => {
  const { timerMinutes, endSession, selectedApps } = useAppContext();
  const [secondsLeft, setSecondsLeft] = useState(timerMinutes * 60);
  const [isRunning, setIsRunning] = useState(true);
  
  const completeSession = useCallback(() => {
    endSession(true);
    
    // Play notification sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(error => console.error('Failed to play audio:', error));
    
    // Show browser notification if supported
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('LockTFin: Focus Session Complete', {
          body: 'Great job! Your focus session is complete.',
          icon: '/favicon.ico'
        });
      }
    }
  }, [endSession]);

  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isRunning && secondsLeft > 0) {
      intervalId = window.setInterval(() => {
        setSecondsLeft(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(intervalId);
            completeSession();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, secondsLeft, completeSession]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const progress = ((timerMinutes * 60 - secondsLeft) / (timerMinutes * 60)) * 100;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Focus Session</h2>
        <button 
          onClick={() => endSession(false)}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="relative">
        <div className="w-48 h-48 mx-auto rounded-full flex items-center justify-center border-8 border-gray-100">
          <div className="text-3xl font-bold text-gray-800">
            {formatTime(secondsLeft)}
          </div>
        </div>
        <svg className="absolute top-0 left-1/2 transform -translate-x-1/2" width="164" height="164">
          <circle
            cx="82" 
            cy="82" 
            r="74"
            fill="none"
            stroke="#E5E7EB" 
            strokeWidth="8"
          />
          <circle
            cx="82" 
            cy="82" 
            r="74"
            fill="none"
            stroke="#3B82F6" 
            strokeWidth="8"
            strokeDasharray="465"
            strokeDashoffset={465 - (465 * progress / 100)}
            transform="rotate(-90, 82, 82)"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <button 
        onClick={toggleTimer}
        className={`
          mt-8 w-full py-3 rounded-xl font-medium transition-colors
          ${isRunning 
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'}
        `}
      >
        {isRunning ? 'Pause Session' : 'Resume Session'}
      </button>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Working with:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedApps.map(app => (
            <div key={app.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              {app.icon} {app.name}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘ + ⌥ + ⇧ + E</kbd> to exit early</p>
      </div>
    </div>
  );
};

export default SessionTimer;