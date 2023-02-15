const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;

// Get search results
export const searchUsers = async text => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

  if (response.status === 400) {
    window.location = '/notfound';
  } else {
    const data = await response.json();

    return data.items;
  }
};

// Get single user
export const getUser = async login => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`);

  if (response.status === 400) {
    window.location = '/notfound';
  } else {
    const data = await response.json();

    return data;
  }
};

// Get repos
export const getUserRepos = async login => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
  const data = await response.json();

  return data;
};
