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
    setFavoriteAuthor,
    setVerseEmotion
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
  setVerseEmotion: ({id, status, emotion}) => {
    const body = {status, emotion};
    return HttpService.fetch(setVerseEmotion(id), body);
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
