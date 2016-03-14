import { compose } from 'ramda';
import createActions from './createActions';
import createReducer from './createReducer';
import formatConstants from './formatConstants';

const reduxify = transformations => {
  return {
    actions: createActions(transformations),
    reducer: createReducer(transformations),
  };
};

export default (modulePrefix, transformations) =>
  compose(
    reduxify,
    formatConstants(modulePrefix)
  )(transformations);
