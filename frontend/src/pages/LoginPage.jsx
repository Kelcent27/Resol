function LoginPage() {
  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem('resol-user', JSON.stringify({ name: 'Alex', email: 'alex@resol.app' }));
    window.location.href = '/';
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Welcome to Resol</h1>
        <p>Plan, remember, and stay in sync with your work.</p>
        <form onSubmit={handleLogin} className="auth-form">
          <input type="email" placeholder="Email" defaultValue="alex@resol.app" />
          <input type="password" placeholder="Password" defaultValue="password123" />
          <button type="submit" className="primary-btn">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
