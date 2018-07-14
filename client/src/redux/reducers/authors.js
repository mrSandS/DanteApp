import ApiService from '@services/api';
import {
	SET_AUTHORS,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
  SET_CURRENT_VALUES
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

export const addToFavorites = payload => {
	return {
		type: ADD_TO_FAVORITES,
		payload
	}
}

export const removeFromFavorites = payload => {
	return {
		type: REMOVE_FROM_FAVORITES,
		payload
	}
}
export const setCurrentValues = payload => {
  return {
    type: SET_CURRENT_VALUES,
    payload
  }
}
export default authorsReducer;