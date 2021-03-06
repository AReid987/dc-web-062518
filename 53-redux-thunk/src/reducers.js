import { combineReducers } from "redux";
import {
  FETCH_PAINTINGS,
  SELECT_ACTIVE_PAINTING,
  DELETE_PAINTING,
  SELECT_GALLERY
} from "./actions/types";

const paintingsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PAINTINGS:
      return [...action.payload];
    case DELETE_PAINTING:
      return state.filter(painting => painting.id !== action.id);
    default:
      return state;
  }
};

const activePaintingIdReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_ACTIVE_PAINTING:
      return action.id;
    case DELETE_PAINTING:
      return null;
    default:
      return state;
  }
};

// could have a special string for all museums
// we'll use null - slightly more clear that it's not a gallery
// TODO: create an action that the reducer responds to, link it to the component
// use this state in our components
const activeGalleryReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_GALLERY:
      return action.name;
    default:
      return state;
  }
};

// const rootReducer = (state = { paintings: [], activePaintingId: null}, action) => {
//   switch (action.type) {
//     case FETCH_PAINTINGS:
//       return { ...state, paintings: [...action.payload] };
//     case SELECT_ACTIVE_PAINTING:
//       return { ...state, activePaintingId: action.id };
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  activeGallery: activeGalleryReducer,
  paintings: paintingsReducer,
  activePaintingId: activePaintingIdReducer
});

// NOTE:
// the keys in the object passed to combineReducers
// will become the top level keys of redux store state
// i.e. store.getState() would return =>
// {
//   paintings: {
//     /* state returned ftom paintingsReducer */
//   },
//   activePainting: {
//     /* state returned from activePaintingReducer */
//   }
// }

export default rootReducer;
