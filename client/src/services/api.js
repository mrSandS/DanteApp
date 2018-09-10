import API from '@consts/api';
import HttpService from './http';

const {
  authors: {
    getData
  },
  auth: {
    register,
    login,
    getProfile,
    setFavoriteAuthor
  }
} = API;

export default {
  getAuthors: () => {
    return HttpService.fetch(getData);
  },
  setFavoriteAuthor: ({id, status}) => {
    const body = {status};
    return HttpService.fetch(setFavoriteAuthor(id), body);
  },
  register: body => {
    return HttpService.fetch(register, body);
  },
  login: body => {
    return HttpService.fetch(login, body);
  },
  getProfile: () => {
    return HttpService.fetch(getProfile);
  }
}
