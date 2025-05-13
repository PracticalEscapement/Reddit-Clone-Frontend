const getBaseUrl = () => {
//   if (typeof window === 'undefined') {
//     // Optional: Handle server-side if using SSR
//     return process.env.API_URL || 'http://localhost:3000';
//   }

  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  return isLocal ? 'http://localhost:5000/api' : 'https://csc-325-group-project.onrender.com/api';
};

// Example GET request
export const apiGet = async (endpoint) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}${endpoint}`, {
    credentials: 'include', // if you’re using cookies for auth
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// Example POST request
export const apiPost = async (endpoint, data) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `API Error: ${response.status}`);
  }

  return response.json();
};
