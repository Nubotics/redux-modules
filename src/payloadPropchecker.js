import { curry, keys, forEach, compose } from 'ramda';

const defaultPropCheck = () => { return {}; };

export const propCheckedPayloadCreator = curry(
  ({actionName, payloadTypes, onError}, payload) => {

    const _propCheck = type => {
      const propChecker = payloadTypes[type] || defaultPropCheck;
      const typeError = propChecker(payload, type, actionName, 'prop') || {};
      const { message } = typeError;

      message && onError(message);
    }

    compose(
      forEach(_propCheck),
      keys
    )(payloadTypes);

    return payload;
  }
);

export default propCheckedPayloadCreator;
