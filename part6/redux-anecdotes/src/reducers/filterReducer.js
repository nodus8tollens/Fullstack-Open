// A reducer for the SET_FILTER action. Upon being activated by the dispatch func,
// it forwards the filter string (action.payload) to the store
const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

// Used to forward an action to the dispatch
const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

export { filterReducer, setFilter };
