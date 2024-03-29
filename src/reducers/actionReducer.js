import { SET_RESULT_DATA, SET_IS_LOADING_HEATMAP } from '../actions/ActionTypes';

const initialState = {
    resultData: [],
    isLoadingHeatmap: false
};
// console.log(initialState);

const actionReducer = (state = initialState, action) => {
  const { type, payload } = action;
//   console.log(type,payload);
  switch (type) {
        case SET_RESULT_DATA:
            return {
                ...state,
                resultData: payload,
            };
        case SET_IS_LOADING_HEATMAP:
            return {
                ...state,
                isLoadingHeatmap: payload
            };
        default:
            return state;
    }
};

export default actionReducer;