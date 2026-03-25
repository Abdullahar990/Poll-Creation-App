import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../authSlice';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '3rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0', textAlign: 'left' }}>🎓 FAST Campus Voice</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Live Polling System
        </p>
      </div>
      
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 1rem', borderRadius: '50px' }}>
            <img 
              src={user.picture} 
              alt="Profile" 
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              referrerPolicy="no-referrer"
            />
            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>{user.name}</span>
          </div>
          
          <button 
            onClick={() => dispatch(logout())}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-danger)',
              color: 'var(--color-danger)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--color-danger)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-danger)';
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
