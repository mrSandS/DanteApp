export const hostname = 'http://192.168.0.32:3000';

const getApiPath = path => {
  return `${hostname}/api/${path}`
};

const API = {
  authors: {
    getData: {
      path: getApiPath('authors'),
      method: 'GET'
    }
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
    },
    setFavoriteAuthor: id => ({
      path: getApiPath(`auth/setFavoriteAuthor/${id}`),
      method: 'PUT'
    }),
    setVerseEmotion: id => ({
      path: getApiPath(`auth/setVerseEmotion/${id}`),
      method: 'PUT'
    }),
  }
};

export default API;