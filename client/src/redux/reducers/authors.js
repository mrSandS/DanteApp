import ApiService from '@services/api';
import {
	SET_AUTHORS,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
  SET_CURRENT_VALUES,
  SET_FAVORITE_STATUS
} from '@consts/actions';

const initialState = {
  data: [],
  favorites: []
};

const authorsReducer = (state = initialState, action) => {

  switch (action.type) {
  	case SET_AUTHORS:
  		return {
  			...state,
        data: action.payload
  		};
    case SET_FAVORITE_STATUS:
      return {
        ...state,
        data: state.data.map(el => {
          if (el._id === action.payload.id) {
            return {
              ...el,
              isFavorite: action.payload.status
            }
          }
          return el
        })
      };
    default:
      return state
  }
};

export const setAuthors = () => {
  return dispatch => {
    return ApiService.getAuthors()
      .then(res => {
        dispatch({
          type: SET_AUTHORS,
          payload: res
        });
        return res
      })
  };
};

export const setFavoriteStatus = payload => {
  return dispatch => {
    /*
    const {
      id,
      status
    } = payload;
    */
    ApiService
      .setFavoriteStatus(payload)
      .then(res => {
        if(res.ok) {
          dispatch({
            type: SET_FAVORITE_STATUS,
            payload
          })
        }
      })
  }
};

export const setCurrentValues = payload => {
  return {
    type: SET_CURRENT_VALUES,
    payload
  }
}
export default authorsReducer;