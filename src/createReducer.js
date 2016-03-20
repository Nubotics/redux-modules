import { Map } from 'immutable';
import { compose, reduce } from 'ramda';
import { handleActions } from 'redux-actions';

const _generateReducer = (generatedReducer, transformation) => {
  const { formattedConstant, reducer } = transformation;

  generatedReducer[formattedConstant] = reducer;
  return generatedReducer;
};

export const createReducer = (initialState = Map(), transformations) => {
  const reducer = transformations.reduce(_generateReducer, {});
  return handleActions(reducer, initialState)
};

export default createReducer;
