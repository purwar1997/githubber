import { Link, Form } from 'react-router-dom';

export default function Header({ user }) {
  return (
    <header className='topbar'>
      <Link to='.' className='site-logo'>
        GitHubber
      </Link>

      {user && <p>Welcome, {user.github}</p>}

      <nav className='nav-links'>
        {user ? (
          <Form action='logout' method='post'>
            <button className='logout-btn' type='submit'>
              Logout
            </button>
          </Form>
        ) : (
          <>
            <Link to='login'>Sign in</Link>
            <Link to='signup'>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
