import { createAction } from 'redux-actions';
import { reduce } from 'ramda';
import payloadPropchecker from './payloadPropchecker';

const _generateActions = (generatedActions, transformation) => {
  const {
    action,
    payloadTypes = {},
    formattedConstant,
  } = transformation;
  const camelizedActionName = camelize(action);

  generatedActions[camelizedActionName] = createAction(
    formattedConstant,
    payloadPropchecker(formattedConstant, payloadTypes)
  );

  return generatedActions;
},

export const createActions = transformations =>
  reduce(_generateActions, {}, transformations);


export default createActions;
