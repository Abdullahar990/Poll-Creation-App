import React from 'react';
import { useSelector } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import StatisticsDashboard from './components/StatisticsDashboard';
import PollCreator from './components/PollCreator';
import PollList from './components/PollList';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import './index.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="app-container">
        {isAuthenticated ? (
          <>
            <Navbar />
            <StatisticsDashboard />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <PollCreator />
            </div>
            <PollList status="active" title="Active Polls ⚡" />
            <PollList status="closed" title="Closed Polls 🏁" />
          </>
        ) : (
          <LoginScreen />
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
