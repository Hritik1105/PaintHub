import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../data/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const result = await loginUser({ email, password });
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    alert(`Welcome back, ${result.user.name}!`);
    navigate('/homepage');
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h2>Login to PaintHub</h2>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error && <p style={{ color: '#ff7f7f', marginTop: 0 }}>{error}</p>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="muted">
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
