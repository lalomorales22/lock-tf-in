import React from 'react';
import { Clock, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const TimerSelector = () => {
  const { timerMinutes, setTimerMinutes } = useAppContext();
  
  const handleIncrement = () => {
    setTimerMinutes(timerMinutes + 5);
  };

  const handleDecrement = () => {
    if (timerMinutes > 5) {
      setTimerMinutes(timerMinutes - 5);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-800 mb-3">Set your focus time</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-gray-700">Focus Duration</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleDecrement}
              className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
              disabled={timerMinutes <= 5}
            >
              <Minus className="h-4 w-4 text-gray-700" />
            </button>
            
            <span className="text-xl font-medium w-16 text-center">
              {timerMinutes} min
            </span>
            
            <button 
              onClick={handleIncrement}
              className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <Plus className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[15, 25, 45, 60].map((duration) => (
            <button
              key={duration}
              onClick={() => setTimerMinutes(duration)}
              className={`
                py-2 rounded-lg text-center transition-all duration-200
                ${timerMinutes === duration 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {duration} min
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerSelector;