import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { signup } from '../api';

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData.entries());

  try {
    await signup(credentials);
    return redirect('/login');
  } catch (err) {
    return err;
  }
}

export default function Signup() {
  const error = useActionData();
  const navigation = useNavigation();

  return (
    <section className='signup-page'>
      <h1>Signup to create your account</h1>

      <Form method='post'>
        <input type='text' name='github' placeholder='Github' />
        <input type='email' name='email' placeholder='Email address' />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit'>
          {navigation.state === 'submitting' ? 'Signing up...' : 'Signup'}
        </button>
      </Form>

      {error && <p className='signup-error'>{error.message}</p>}
    </section>
  );
}
