import React from 'react';
import { useAppContext } from '../context/AppContext';

const AppSelector = () => {
  const { apps, toggleAppSelection } = useAppContext();

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-800 mb-3">Select apps to use during focus time</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => toggleAppSelection(app.id)}
            className={`
              p-4 rounded-xl flex flex-col items-center justify-center
              border-2 cursor-pointer transition-all duration-200 h-24
              ${app.isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <span className="text-2xl mb-2">{app.icon}</span>
            <span className="text-sm font-medium">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppSelector;