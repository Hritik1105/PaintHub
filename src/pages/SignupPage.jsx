import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, validateSignupInput } from '../data/auth';

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const validationMessage = validateSignupInput({ name, email, password, confirmPassword });
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    const result = await signupUser({ name, email, password });
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    alert('Signup successful. Please login with your new account.');
    navigate('/login');
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Create PaintHub Account</h2>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Full Name" value={name} onChange={(event) => setName(event.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          {error && <p style={{ color: '#ff7f7f', marginTop: 0 }}>{error}</p>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <p className="muted">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
