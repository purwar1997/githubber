import { Outlet, useLoaderData } from 'react-router-dom';
import Header from './Header';

export async function loader() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user;
}

export default function Layout() {
  const user = useLoaderData();

  return (
    <main className='root'>
      <Header user={user} />
      <section className='container'>
        <Outlet />
      </section>
    </main>
  );
}
