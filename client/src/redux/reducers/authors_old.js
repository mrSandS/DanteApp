import authors from '@assets/data';

import {
	SET_AUTHORS,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
  SET_CURRENT_VALUES
} from '@consts/actions';

const initialState = {
  data: [],
  favorites: [],

  currentAuthorIndex: 0,
  currentVerseIndex: 0,
  currentVerseStringIndex: 0,
  isPlaying: false,

  currentAuthor: null,
  currentVerses: null,
  currentVerse: null, 
  currentText: null,
  currentString: null
};

const getNewData = ({
  data,
  currentAuthorIndex,
  currentVerseIndex,
  currentVerseStringIndex
}) => {
  if (data.length) {
    const currentAuthor = data[currentAuthorIndex];
    const currentVerses = currentAuthor.verses;
    const currentVerse = currentVerses[currentVerseIndex];
    const currentText = currentVerse.text
      .split('\n')
      .filter(string => string)
      .map(string => string.trim());
    const currentString = currentText[currentVerseStringIndex];
    return {
      currentAuthor,
      currentVerses,
      currentVerse,
      currentText,
      currentString
    }
  }
  return {}
}

const authorsReducer = (state = initialState, action) => {
  const {
    data,
    favorites,
    currentAuthorIndex,
    currentVerseIndex,
    currentVerseStringIndex,
    isPlaying  
  } = state;

  let newData = {};
  let addedFavorite;

  switch (action.type) {
  	case SET_AUTHORS:
      const newFavorites = action.payload.filter(author => author.isFavorite);
      newData = getNewData ({
        data: newFavorites,
        currentAuthorIndex,
        currentVerseIndex,
        currentVerseStringIndex
      })
  		return {
  			...state,
        ...newData,
        data: action.payload,
        favorites: newFavorites,
  		}
  	case ADD_TO_FAVORITES:

      newData = state.data.map(author => {
        if (author._id === action.payload) {
          addedFavorite = author;
          return {
            ...author,
            isFavorite: true
          }             
        }
        return author
      })
  		return {
  			...state,
  			data: newData,
        favorites: [addedFavorite, ...state.favorites]
  		}
  	case REMOVE_FROM_FAVORITES:
  		return {
  			...state,
  			data: state.data.map(author => {
  				if (author._id === action.payload) {
  					return {
  						...author,
  						isFavorite: false
  					}	  					
  				}
  				return author
  			}),
        favorites: state.favorites.filter(author => author._id !== action.payload)
  		}		
    case SET_CURRENT_VALUES:
      newData = getNewData ({
        data: state.favorites,
        currentAuthorIndex: action.payload.currentAuthorIndex !== undefined ? action.payload.currentAuthorIndex : currentAuthorIndex,
        currentVerseIndex: action.payload.currentVerseIndex !== undefined ? action.payload.currentVerseIndex : currentVerseIndex,
        currentVerseStringIndex: action.payload.currentVerseStringIndex !== undefined ? action.payload.currentVerseStringIndex : currentVerseStringIndex
      })
      return {
        ...state,
        ...newData,
        ...action.payload
      }
    default:
      return state
  }
}

export const setAuthors = () => {
  return {
    type: SET_AUTHORS,
    payload: authors
  }   
}

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