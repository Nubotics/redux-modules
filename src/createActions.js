import { createAction } from 'redux-actions';
import { reduce } from 'ramda';
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

export const createActions = transformations =>
  reduce(_generateActions, {}, transformations);


export default createActions;
