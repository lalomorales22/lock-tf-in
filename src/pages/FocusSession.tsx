import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SessionTimer from '../components/SessionTimer';

const FocusSession = () => {
  const { isSessionActive, selectedApps } = useAppContext();
  const navigate = useNavigate();

  // Redirect if no session is active
  useEffect(() => {
    if (!isSessionActive || selectedApps.length === 0) {
      navigate('/');
    }
  }, [isSessionActive, navigate, selectedApps]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SessionTimer />
    </div>
  );
};

export default FocusSession;