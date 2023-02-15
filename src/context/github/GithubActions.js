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
