import { Form } from 'react-router-dom';

export default function Signup() {
  return (
    <section className='signup-page'>
      <h1>Signup to create your account</h1>

      <Form method='post'>
        <input type='text' name='github' placeholder='Github' />
        <input type='email' name='email' placeholder='Email address' />
        <input type='password' name='password' placeholder='Password' />
        <button type='sumit'>Signup</button>
      </Form>

      <p className='signup-error'>Please enter all the details</p>
    </section>
  );
}
