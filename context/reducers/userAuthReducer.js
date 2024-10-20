// context/reducer/userAuthReducer.js
const initialState = {
  user: null, 
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_NULL":
      return {
        ...state,
        user: null,
      };
    case "UPDATE_USER_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.userData,
        },
      };
    default:
      return state;
  }
};

export default userAuthReducer;
