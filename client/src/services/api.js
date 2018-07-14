import API from '@consts/api';
import HttpService from './http';

const {
  authors: authorsApi,
  auth: authApi
} = API;

export default {
  getAuthors: () => {
    return HttpService.fetch(authorsApi)
  },
  register: body => {
    return HttpService.fetch(authApi.register, body)
  },
  login: body => {
    return HttpService.fetch(authApi.login, body)
  },
  getProfile: () => {
    return HttpService.fetch(authApi.getProfile)
  }
}
