import { SET_RESULT_DATA, SET_IS_LOADING_HEATMAP } from './ActionTypes';

export const setResultData = (data) => ({
  type: SET_RESULT_DATA,
  payload: data,
});

export const setIsLoadingHeatmap = (isLoading) => ({
    type: SET_IS_LOADING_HEATMAP,
    payload: isLoading
});