import { curry } from 'ramda';

const _formatConstant = (modulePrefix, actionName) => {
  return `${modulePrefix}/${actionName}`;
};

const _appendFormattedConstant = curry(
  (modulePrefix, transform) => {
    return {
      ... transform,
      formattedConstant: _formatConstant(modulePrefix, transform.action),
    };
  }
);

export const formatConstants = curry(
  (modulePrefix, transformations) => {
    return transformations.map(_appendFormattedConstant(modulePrefix))
  }
);

export default formatConstants;
