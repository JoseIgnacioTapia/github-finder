import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
});

// Get search results
export const searchUsers = async text => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`${GITHUB_URL}/search/users?${params}`);

  return response.data.items;
};

// Get User & Repos
export const getUserAndRepos = async login => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);
  console.log(user);
  console.log(repos);

  return { user: user.data, repos: repos.data };
};
