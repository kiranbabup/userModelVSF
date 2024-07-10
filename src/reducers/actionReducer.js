import { SET_RESULT_DATA, SET_IS_LOADING_HEATMAP, SET_LOGIN_WORD } from '../actions/ActionTypes';

const initialState = {
    resultData: [],
    isLoadingHeatmap: false,
    loginWord: ""
};
// console.log(initialState);

const actionReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.log("Action received in reducer:", type, payload);
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
        case SET_LOGIN_WORD:
            return {
                ...state,
                loginWord: payload
            };
        default:
            return state;
    }
};

export default actionReducer;