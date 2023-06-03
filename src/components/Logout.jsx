import { redirect } from 'react-router-dom';

export async function action() {
  localStorage.removeItem('loggedInUser');
  return redirect('/login');
}
