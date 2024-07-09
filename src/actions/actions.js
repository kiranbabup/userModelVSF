import { SET_RESULT_DATA, SET_IS_LOADING_HEATMAP, SET_LOGIN_WORD } from './ActionTypes';

export const setResultData = (data) => ({
  type: SET_RESULT_DATA,
  payload: data,
});

export const setIsLoadingHeatmap = (isLoading) => ({
    type: SET_IS_LOADING_HEATMAP,
    payload: isLoading
});

export const setLoginWord = (loginWord) => ({
  type: SET_LOGIN_WORD,
  payload: loginWord,
});
