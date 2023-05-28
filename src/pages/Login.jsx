import { Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import { login } from '../api';

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData.entries());

  try {
    const { user } = await login(credentials);
    localStorage.setItem('user', JSON.stringify(user));
    return redirect('/');
  } catch (err) {
    return err;
  }
}

export default function Login() {
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <section className='login-page'>
      <h1>Login to your account</h1>

      <Form method='post'>
        <input type='email' name='email' placeholder='Email address' />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit'>
          {navigation.state === 'submitting' ? 'Logging in...' : 'Login'}
        </button>
      </Form>

      {error && <p className='login-error'>{error.message}</p>}

      <p className='signup-link'>
        Don't have an account? <Link to='/signup'>Signup</Link>
      </p>
    </section>
  );
}
