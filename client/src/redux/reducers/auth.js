/**
 * Created by Sergun on 13.05.2018.
 */
import ApiService from '@services/api';
import StorageService from '@services/storage';
import HttpService from '@services/http';
import {
  SET_AUTH_DATA,
  REMOVE_AUTH_DATA
} from '@consts/actions';

const initialState = {
  data: []
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
        data: []
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
// export const register = profileData => {
//   return dispatch => {
//     const {
//       emailValue,
//       passwordValue
//     } = profileData;
//     const requestBody = {
//       email: emailValue,
//       password: passwordValue
//     };
//     return ApiService.register(requestBody)
//       .then(res => {
//         dispatch({
//           type: SET_AUTH_DATA,
//           payload: res.data
//         });
//         HttpService.setSessionToken(res.data.token);
//         StorageService.setSessionToken(res.data.token);
//         return res.data
//       })
//   };
// };
//
// export const login = profileData => {
//   return dispatch => {
//     const {
//       emailValue,
//       passwordValue
//     } = profileData;
//     const requestBody = {
//       email: emailValue,
//       password: passwordValue
//     };
//     return ApiService.login(requestBody)
//       .then(res => {
//         console.log('Login res: ', res);
//         // dispatch({
//         //   type: SET_AUTHORS,
//         //   payload: res
//         // });
//         // return res
//       })
//   };
// };

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
      });
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

export default authReducer;