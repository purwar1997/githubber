import { useState, useEffect, Suspense } from 'react';
import { Form, useLoaderData, useNavigation, defer, Await, useAsyncValue } from 'react-router-dom';
import { getUser, authRequired } from '../utils';
import SkeletonProfile from '../components/skeletons/SkeletonProfile';

export async function loader({ request }) {
  await authRequired();

  const query = new URL(request.url).searchParams.get('query');
  let githubId = query?.trim();

  if (!githubId) {
    githubId = JSON.parse(localStorage.getItem('loggedInUser')).github;
  }

  const user = getUser(githubId);
  return defer({ user, query });
}

export default function Profile() {
  const [search, setSearch] = useState('');
  const { user, query } = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    document.getElementById('search').value = query;
  }, [query]);

  if (navigation.state === 'loading') {
    return <SkeletonProfile />;
  }

  return (
    <section className='profile-page'>
      <Form className='search-form'>
        <input
          type='search'
          id='search'
          name='query'
          placeholder='Search'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type='submit' disabled={search === null || search.trim() === ''}>
          Search
        </button>
      </Form>

      <Suspense fallback={<SkeletonProfile />}>
        <Await resolve={user}>
          <RenderProfile />
        </Await>
      </Suspense>
    </section>
  );
}

function RenderProfile() {
  const { user, repos } = useAsyncValue();

  if (!user.id) {
    return <p>No user found</p>;
  }

  return (
    <div className='profile'>
      <div className='user'>
        <img src={user.avatar_url} alt={user.login} />

        <div className='user-info'>
          <h1>{user.name}</h1>

          {user.bio && <p>{user.bio}</p>}

          <div className='follows'>
            <span>{user.followers} followers</span>
            <span>{user.following} following</span>
          </div>

          {user.location && <p>{user.location}</p>}

          {user.blog && (
            <a href={user.blog} target='_blank'>
              {user.blog}
            </a>
          )}

          {user.twitter_username && (
            <a href={`https://twitter.com/${user.twitter_username}`} target='_blank'>
              @{user.twitter_username}
            </a>
          )}
        </div>
      </div>

      {repos.length ? (
        <div className='repos'>
          {repos.map(repo => (
            <div className='repo' key={repo.id}>
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
              <p>Language used : {repo.language}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No repositories found</p>
      )}
    </div>
  );
}
