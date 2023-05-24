import { Form, Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className='login-page'>
      <h1>Login to your account</h1>

      <Form>
        <input type='email' name='email' placeholder='Email address' />
        <input type='password' name='password' placeholder='Password' />
        <button type='submit'>Login</button>
      </Form>

      <p className='login-error'>Please enter all the details</p>

      <p className='signup-link'>
        Don't have an account? <Link to='/signup'>Signup</Link>
      </p>
    </section>
  );
}
