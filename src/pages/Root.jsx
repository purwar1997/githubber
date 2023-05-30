import { Form, Link, Outlet, useLoaderData } from 'react-router-dom';

export async function loader() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user;
}

export default function Root() {
  const user = useLoaderData();

  return (
    <main className='root'>
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

      <section className='container'>
        <Outlet />
      </section>
    </main>
  );
}
