/**
 * Created by Sergun on 13.05.2018.
 */
import ApiService from '@services/api';
import StorageService from '@services/storage';
import HttpService from '@services/http';
import {
  SET_AUTH_DATA,
  REMOVE_AUTH_DATA,
  SET_FAVORITE_AUTHORS,
  SET_AUTHOR_RATING,
  SET_VERSE_EMOTIONS,
  SET_VERSE_EMOTIONS_RATING,
} from '@consts/actions';
import {
  heart
} from '@consts/emotions';
const initialState = {
  data: {}
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_AUTH_DATA:
      return {
        ...state,
        data: action.payload
      };
    case REMOVE_AUTH_DATA:
      return {
        ...state,
        data: {}
      };
    case SET_FAVORITE_AUTHORS:
      return {
        ...state,
        data: {
          ...state.data,
          favoriteAuthors: action.payload
        }
      };
    case SET_VERSE_EMOTIONS:
      return {
        ...state,
        data: {
          ...state.data,
          versesEmotions: action.payload
        }
      };
    default:
      return state
  }
};

export const loadSession = () => {
  // StorageService.cleanSessionToken();
  return dispatch => {
    console.log('LOAD SESSION');
    return StorageService.getSessionToken()
      .then(token => {
        console.log('STORAGE SERVICE Get Session Token: ', token);
        /*
        * ============================================
        * Token is not seen after certain number of requests
        * ============================================
        */
        if (!token) {

          return Promise.resolve(null);
        } else {
          HttpService.setSessionToken(token);
          return ApiService.getProfile()
        }
      })
      .then(res => {
        if (res && res.data && res.data._id) {
          dispatch({
            type: SET_AUTH_DATA,
            payload: res.data
          });
          return res.data
        } else {
          return null
        }
      })
  }
};

export const authorize = ({profileData, actionName}) => {
  return dispatch => {
    const {
      emailValue,
      passwordValue
    } = profileData;
    const requestBody = {
      email: emailValue,
      password: passwordValue
    };

    let requestFunction;
    if (actionName === 'login') {
      requestFunction = ApiService.login(requestBody);
    } else if (actionName === 'register') {
      requestFunction = ApiService.register(requestBody);
    }

    return requestFunction
      .then(res => {
        dispatch({
          type: SET_AUTH_DATA,
          payload: res.data
        });
        HttpService.setSessionToken(res.data.token);
        StorageService.setSessionToken(res.data.token);
        return res.data
      })
  };
};

export const logOut = () => {
  StorageService.cleanSessionToken();
  HttpService.cleanSessionToken();
  return dispatch => {
    dispatch({
      type: REMOVE_AUTH_DATA
    });
  }
};

export const setFavoriteAuthor = payload => {
  return dispatch => {
    /*
     const {
     id,
     status
     } = payload;
     */
    ApiService
      .setFavoriteAuthor(payload)
      .then(res => {
        const {
          user,
          author
        } = res.data;
        dispatch({
          type: SET_FAVORITE_AUTHORS,
          payload: user.favoriteAuthors
        });
        dispatch({
          type: SET_AUTHOR_RATING,
          payload: {
            id: author._id,
            rating: author.rating
          }
        });
      })
  }
};

export const setVerseEmotion = ({authorId, verseId, status, emotion}) => {
  return dispatch => {
    console.log("AuthorId: ", authorId);
    return ApiService.setVerseEmotion({id: verseId, status, emotion})
      .then(res => {
        dispatch({
          type: SET_VERSE_EMOTIONS,
          payload: res.data.user.versesEmotions
        });
        dispatch({
          type: SET_VERSE_EMOTIONS_RATING,
          payload: {
            authorId,
            verseId,
            emoRating: res.data.verse.emoRating
          }
        });
      })
  }
};

export default authReducer;