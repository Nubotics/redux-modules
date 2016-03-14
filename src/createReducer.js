import { Map } from 'immutable';
import { compose, reduce } from 'ramda';
import { handleActions } from 'redux-actions';

const _generateReducer = (generatedReducer, transformation) => {
  const { formattedConstant, reducer } = transformation;

  generatedReducer[formattedConstant] = reducer;
  return generatedReducer;
};

export const createReducer = transformations =>
  compose(
    handleActions,
    reduce(_generateReducer, Map())
  )(transformations);


export default createReducer;
