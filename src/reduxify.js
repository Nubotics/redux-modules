import { compose } from 'ramda';
import createActions from './createActions';
import createReducer from './createReducer';

const formatConstant = (duckName, actionName) => {
  return `${duckName}/${actionName}`;
};

const reduxify = transformations => {
  return {
    actions: createActions(transformations),
    reducer: createReducer(transformations),
  };
};

const formatConstants = curry(
  (modulePrefix, transformations) =>
  transformations.map(transform => {
    return {
      ... transform,
      formattedConstant: formatConstant(modulePrefix, transform.action),
    };
  })
);

export default (modulePrefix, transformations) => {
  return compose(
    reduxify,
    formatConstants(modulePrefix)
  )(transformations);
};
