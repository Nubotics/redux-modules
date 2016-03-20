import { curry, keys, forEach, compose } from 'ramda';

const defaultPropCheck = () => { return {}; };

const _propCheck = type => {
  const propChecker = payloadTypes[type] || defaultPropCheck;
  const typeError = propChecker(payload, type, name, 'prop');
  const { message } = typeError;

  message && console.error(
    'REDUXIFY: Action Payload Type Mismatch!',
    message
  );
}

export const propCheckedPayloadCreator = curry(
  (name, payloadTypes, payload) => {
    compose(
      forEach(_propCheck),
      keys
    )(payloadTypes);

    return payload;
  }
);

export default propCheckedPayloadCreator;
