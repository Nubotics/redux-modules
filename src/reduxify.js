import { compose } from 'ramda';
import createActions from './createActions';
import createReducer from './createReducer';
import formatConstants from './formatConstants';

const _generateReduxComponents = transformations => {
  return {
    actions: createActions(transformations),
    reducer: createReducer(transformations),
  };
};

const reduxify = (modulePrefix, transformations) => {
  return compose(
    _generateReduxComponents,
    formatConstants(modulePrefix)
  )(transformations);
};

export default reduxify;
