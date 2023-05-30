import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error = useRouteError();

  return (
    <div className='error-container'>
      <h1>Oops!</h1>
      <p>An unexpected error had occured</p>
      <p className='error-message'>{error.message}</p>
    </div>
  );
}
