import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import camelize from 'camelcase';
import { compose, curry } from 'ramda';

const formatConstant = (duckName, actionName) => {
  return `${duckName}/${actionName}`;
};

const typecheckedPayloadCreator = curry(
  (name, payloadTypes, payload) => {
    const payloadKeys = Object.keys(payloadTypes);

    payloadKeys.forEach(type => {
      const typeChecker = payloadTypes[type];
      if (!typeChecker) { return; }

      const typeError = typeChecker(payload, type, name, 'prop');
      if (!typeError) { return; }

      const { message } = typeError;
      message && console.error('Action Type Error', message);
    });

    return payload;
  }
);

const createReducer = (transformations) => {
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

const createActions = (transformations) => {
  return transformations.reduce(
    (actions, {action, payloadTypes = {}, formattedConstant}) => {
      const camelizedActionName = camelize(action);

      actions[camelizedActionName] = createAction(
        formattedConstant,
        typecheckedPayloadCreator(formattedConstant, payloadTypes)
      );
      return actions;
    },
    {}
  );
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

const reduxify = transformations => {
  return {
    actions: createActions(transformations),
    reducer: createReducer(transformations),
  };
};

export default (modulePrefix, transformations) => {
  return compose(
    reduxify,
    formatConstants(modulePrefix)
  )(transformations);
};
