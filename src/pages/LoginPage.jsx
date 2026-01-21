import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className=" shadow-lg" style={{
          border: 'none',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div className="card-header text-center" style={{
            background: 'black',
            color: 'white',
            padding: '1.5rem',
            border: 'none'
          }}>
            <h4 className="mb-0" style={{ fontWeight: '600' }}> Admin Login</h4>
          </div>
          <div className="card-body" style={{ padding: '2rem' }}>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" style={{ color: '#1A1A1A', fontWeight: '500' }}>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    borderColor: '#CCCCCC',
                    borderRadius: '3px',
                    padding: '0.75rem'
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: '#1A1A1A', fontWeight: '500' }}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    borderColor: '#CCCCCC',
                    borderRadius: '4px',
                    padding: '0.75rem'
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{
                padding: '0.75rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '4px',
                marginTop: '1rem'
              }}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
