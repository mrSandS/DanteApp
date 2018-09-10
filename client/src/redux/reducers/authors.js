import ApiService from '@services/api';
import {
	SET_AUTHORS,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
  SET_CURRENT_VALUES,
  SET_AUTHOR_RATING
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
    case SET_AUTHOR_RATING:
      return {
        ...state,
        data: state.data.map(el => {
          if (el._id === action.payload.id) {
            return {
              ...el,
              rating: action.payload.rating
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

export const setCurrentValues = payload => {
  return {
    type: SET_CURRENT_VALUES,
    payload
  }
}
export default authorsReducer;