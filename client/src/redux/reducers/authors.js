import ApiService from '@services/api';
import {
	SET_AUTHORS,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
  SET_CURRENT_VALUES,
  SET_AUTHOR_RATING,
  SET_VERSE_EMOTIONS_RATING
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
    case SET_VERSE_EMOTIONS_RATING:
      return {
        ...state,
        data: state.data.map(author => {
          if (author._id === action.payload.authorId) {
            console.log("Emo Rating Author: ", author);
            return {
              ...author,
              verses: author.verses.map(verse => {
                if (verse._id === action.payload.verseId) {
                  console.log("Emo Rating Verse: ", verse);
                  return {
                    ...verse,
                    emoRating: action.payload.emoRating
                  }
                }
                return verse
              })
            }
          }
          return author
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
};

export default authorsReducer;