import React from 'react';
import { Info, Bell, Volume2, ExternalLink } from 'lucide-react';

const Settings = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-800">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Volume2 className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-800">Sound Effects</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ExternalLink className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-800">Launch at startup</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-gray-800 font-medium">About LockTFin</h3>
              <p className="text-gray-600 text-sm mt-1">
                Version 1.0.0 • Designed to help people with ADHD focus better by locking them into selected apps.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            LockTFin © 2025 • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;