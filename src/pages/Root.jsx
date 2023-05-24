import { Link, Outlet, useLoaderData } from 'react-router-dom';

export async function loader() {
  return localStorage.getItem('loggedInUser');
}

export default function Root() {
  const loggedInUser = useLoaderData();

  return (
    <main className='root'>
      <header className='topbar'>
        <Link to='/' className='site-logo'>
          GitHubber
        </Link>

        {/* {isLoggedIn && <p>Welcome, Shubham</p>} */}
        <p>Welcome, Shubham</p>

        <nav className='nav-links'>
          {/* {isLoggedIn ? (
            <Link to='logout'>Logout</Link>
          ) : (
            <>
              <Link to='login'>Sign in</Link>
              <Link to='signup'>Sign up</Link>
            </>
          )} */}
          <Link to='login'>Sign in</Link>
          <Link to='signup'>Sign up</Link>
          <Link to='logout'>Logout</Link>
        </nav>
      </header>

      <section className='container'>
        <Outlet />
      </section>
    </main>
  );
}
