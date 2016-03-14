import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

export const createReducer = (transformations) => {
  return handleActions(
    transformations.reduce(
      (reducer, {formattedConstant, reducer: reduceFunc}) => {
        reducer[formattedConstant] = reduceFunc;
        return reducer;
      },
      {}
    ),
    Map()
  );
};

export default createReducer;
