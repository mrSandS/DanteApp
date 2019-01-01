// Real device
// export const hostname = 'http://192.168.0.32:3000';
// Remote Server
export const hostname = 'https://dante-224318.appspot.com';
// Android Studio emulator
// export const hostname = 'http://10.0.2.2:3000';
// Genymotion emulator
// export const hostname = 'http://10.0.3.2:3000';

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