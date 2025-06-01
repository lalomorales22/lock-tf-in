import React, { createContext, useContext, useState, useEffect } from 'react';

type AppType = {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
};

type SessionLog = {
  id: string;
  date: Date;
  duration: number; // in minutes
  apps: string[]; // app names
  completed: boolean;
};

interface AppContextType {
  apps: AppType[];
  selectedApps: AppType[];
  sessionLogs: SessionLog[];
  timerMinutes: number;
  isSessionActive: boolean;
  toggleAppSelection: (id: string) => void;
  setTimerMinutes: (minutes: number) => void;
  startSession: () => void;
  endSession: (completed?: boolean) => void;
  clearSelectedApps: () => void;
}

const defaultContext: AppContextType = {
  apps: [],
  selectedApps: [],
  sessionLogs: [],
  timerMinutes: 25,
  isSessionActive: false,
  toggleAppSelection: () => {},
  setTimerMinutes: () => {},
  startSession: () => {},
  endSession: () => {},
  clearSelectedApps: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sample apps - in a real app, this would come from the system
  const [apps, setApps] = useState<AppType[]>([
    { id: '1', name: 'Safari', icon: '🧭', isSelected: false },
    { id: '2', name: 'VS Code', icon: '💻', isSelected: false },
    { id: '3', name: 'Slack', icon: '💬', isSelected: false },
    { id: '4', name: 'Mail', icon: '✉️', isSelected: false },
    { id: '5', name: 'Notes', icon: '📝', isSelected: false },
    { id: '6', name: 'Calendar', icon: '📅', isSelected: false },
    { id: '7', name: 'Notion', icon: '📓', isSelected: false },
    { id: '8', name: 'Spotify', icon: '🎵', isSelected: false },
  ]);
  
  const [sessionLogs, setSessionLogs] = useState<SessionLog[]>([]);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  const selectedApps = apps.filter(app => app.isSelected);

  const toggleAppSelection = (id: string) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, isSelected: !app.isSelected } : app
    ));
  };

  const clearSelectedApps = () => {
    setApps(apps.map(app => ({ ...app, isSelected: false })));
  };

  const startSession = () => {
    if (selectedApps.length === 0) return;
    setIsSessionActive(true);
  };

  const endSession = (completed = false) => {
    if (!isSessionActive) return;
    
    // Log the session
    const newLog: SessionLog = {
      id: Date.now().toString(),
      date: new Date(),
      duration: timerMinutes,
      apps: selectedApps.map(app => app.name),
      completed
    };
    
    setSessionLogs([newLog, ...sessionLogs]);
    setIsSessionActive(false);
  };

  // Setup keyboard shortcut for emergency exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' && e.shiftKey && e.altKey && e.metaKey) {
        endSession(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSessionActive]);

  return (
    <AppContext.Provider
      value={{
        apps,
        selectedApps,
        sessionLogs,
        timerMinutes,
        isSessionActive,
        toggleAppSelection,
        setTimerMinutes,
        startSession,
        endSession,
        clearSelectedApps,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};