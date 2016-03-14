import { curry } from 'ramda';

export const typecheckedPayloadCreator = curry(
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

export default typecheckedPayloadCreator;
