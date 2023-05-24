import { useEffect } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { getUser, getRepos } from '../utils';

export async function loader({ request }) {
  let query = new URL(request.url).searchParams.get('query');
  let github = query;

  if (!github) {
    github = localStorage.getItem('loggedInUser');
  }

  const user = await getUser(github);
  const repos = await getRepos(github);
  return { user, repos, query };
}

export default function Profile() {
  const { user, repos, query } = useLoaderData();

  useEffect(() => {
    document.getElementById('search').value = query;
  }, [query]);

  return (
    <section className='profile-page'>
      <Form className='search-form'>
        <input type='search' id='search' name='query' placeholder='Search' defaultValue={query} />
        <button type='submit'>Search</button>
      </Form>

      {user.id ? (
        <div className='profile'>
          <div className='user'>
            <img src={user.avatar_url} alt={user.login} />

            <div className='user-info'>
              <h1>{user.name}</h1>
              <p>{user.bio}</p>
              <div>
                <span>{user.followers} followers</span>
                <span>{user.following} following</span>
              </div>
              <p>{user.location}</p>
              <a href={user.blog} target='_blank'>
                {user.blog}
              </a>
              <a href={`https://twitter.com/${user.twitter_username}`} target='_blank'>
                @{user.twitter_username}
              </a>
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
            <h1>No repositories found</h1>
          )}
        </div>
      ) : (
        <h1>User not found</h1>
      )}
    </section>
  );
}
