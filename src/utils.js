export async function getUser(githubId) {
  try {
    const res = await fetch(`https://api.github.com/users/${githubId}`);
    const user = await res.json();
    return user;
  } catch (err) {
    throw new Error(err.message || 'Error fetching user details');
  }
}

export async function getRepos(githubId) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${githubId}/repos?per_page=100&sort=pushed`
    );
    const repos = await res.json();
    return repos;
  } catch (err) {
    throw new Error(err.message || 'Error fetching github repositories');
  }
}
