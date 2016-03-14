import { createAction } from 'redux-actions';
import payloadTypechecker from './payloadTypechecker';

export const createActions = (transformations) => {
  return transformations.reduce(
    (generatedActions, {action, payloadTypes = {}, formattedConstant}) => {
      const camelizedActionName = camelize(action);

      generatedActions[camelizedActionName] = createAction(
        formattedConstant,
        payloadTypechecker(formattedConstant, payloadTypes)
      );
      return generatedActions;
    },
    {}
  );
};

export default createActions;
