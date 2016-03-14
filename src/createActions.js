import { createAction } from 'redux-actions';
import payloadTypechecker from './payloadTypechecker';

const _generateActions = (generatedActions, transformation) => {
  const {
    action,
    payloadTypes = {},
    formattedConstant,
  } = transformation;
  const camelizedActionName = camelize(action);

  generatedActions[camelizedActionName] = createAction(
    formattedConstant,
    payloadTypechecker(formattedConstant, payloadTypes)
  );
  return generatedActions;
},

export const createActions = (transformations) => {
  return transformations.reduce(_generateActions, {});
};

export default createActions;
