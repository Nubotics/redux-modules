import { curry, keys, forEach, compose } from 'ramda';

const defaultPropCheck = () => { return {}; };

export const propCheckedPayloadCreator = curry(
  (name, payloadTypes, payload) => {

    const _propCheck = type => {
      const propChecker = payloadTypes[type] || defaultPropCheck;
      const typeError = propChecker(payload, type, name, 'prop') || {};
      const { message } = typeError;

      message && console.error(
        'Warning: Failed payloadType:',
        message
      );
    }

    compose(
      forEach(_propCheck),
      keys
    )(payloadTypes);

    return payload;
  }
);

export default propCheckedPayloadCreator;
