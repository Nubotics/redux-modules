import { compose } from 'ramda';
import createActions from './createActions';
import createReducer from './createReducer';
import formatConstants from './formatConstants';

const _generateReduxComponents = transformations => {
  return {
    actions: createActions(transformations),
    reducer: createReducer(store, transformations),
  };
};

export const createModule = (modulePrefix, transformations) => {
  return compose(
    _generateReduxComponents,
    formatConstants(modulePrefix)
  )(transformations);
};
