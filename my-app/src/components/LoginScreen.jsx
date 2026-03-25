import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';
import { LogIn } from 'lucide-react';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleSuccess = (credentialResponse) => {
    // credentialResponse.credential is the JWT Token
    const decoded = jwtDecode(credentialResponse.credential);
    dispatch(loginSuccess({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
      sub: decoded.sub
    }));
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh'
    }}>
      <div className="glass-panel" style={{
        padding: '3rem',
        textAlign: 'center',
        maxWidth: '450px',
        width: '100%'
      }}>
        <LogIn size={48} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>FAST Campus Voice</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          Please log in with your Google account to participate in the polls.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            shape="pill"
            theme="filled_black"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
