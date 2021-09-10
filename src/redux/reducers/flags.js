const defaultState = {
  flagCategory: false,
};

function reducer(state = defaultState, { type }) {
  switch (type) {
    case "flagCategory": {
      if (state.flagCategory) {
        if (window.sessionStorage.getItem("catSelected") !== null) {
          window.sessionStorage.removeItem("catSelected");
        }
      }
      state.flagCategory = !state.flagCategory;
      return { ...state };
    }
    default:
      return state;
  }
}

export default reducer;
