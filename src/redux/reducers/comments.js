const initialState = {
  comments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COMMENTS_SUCCESS':
      return {
        ...state,
        comments: action.payload
      };
    default: return state;      
  }
}
