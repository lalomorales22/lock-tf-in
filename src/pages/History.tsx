import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const History = () => {
  const { sessionLogs } = useAppContext();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const totalMinutes = sessionLogs.reduce((acc, log) => {
    return log.completed ? acc + log.duration : acc;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Focus History</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="text-gray-600 text-sm mb-2">Total Focus Time</h2>
        <div className="flex items-center">
          <Clock className="text-blue-600 h-5 w-5 mr-2" />
          <span className="text-2xl font-semibold">
            {hours > 0 ? `${hours}h ` : ''}{minutes}m
          </span>
        </div>
      </div>

      {sessionLogs.length > 0 ? (
        <div className="space-y-4">
          {sessionLogs.map((log) => (
            <div 
              key={log.id}
              className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">{formatDate(log.date)}</span>
                {log.completed ? (
                  <div className="flex items-center text-green-500 text-sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-500 text-sm">
                    <XCircle className="h-4 w-4 mr-1" />
                    Exited early
                  </div>
                )}
              </div>
              
              <div className="mt-2">
                <span className="text-gray-800 font-medium">{log.duration} minutes</span>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {log.apps.map((app, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No focus sessions yet</p>
          <p className="text-sm text-gray-400 mt-1">Complete a session to see it here</p>
        </div>
      )}
    </div>
  );
};

export default History;