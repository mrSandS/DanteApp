import API from '@consts/api';
import HttpService from './http';

const {
  authors: {
    setFavoriteStatus,
    getData
  },
  auth: {
    register,
    login,
    getProfile
  }
} = API;

export default {
  getAuthors: () => {
    return HttpService.fetch(getData);
  },
  setFavoriteStatus: ({id, status}) => {
    const body = {status};
    return HttpService.fetch(setFavoriteStatus(id), body);
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
