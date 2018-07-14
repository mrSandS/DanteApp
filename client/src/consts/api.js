export const hostname = 'http://192.168.1.90:3000';

const getApiPath = path => {
  return `${hostname}/api/${path}`
};

const API = {
  authors: {
    path: getApiPath('authors'),
    method: 'GET'
  },
  auth: {
    users: {
      path: getApiPath('auth/users'),
      method: 'GET'
    },
    register: {
      path: getApiPath('auth/register'),
      method: 'POST'
    },
    login: {
      path: getApiPath('auth/login'),
      method: 'POST'
    },
    getProfile: {
      path: getApiPath('auth/profile'),
      method: 'GET'
    }
  }
};

export default API;