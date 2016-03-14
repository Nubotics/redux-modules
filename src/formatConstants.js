const _formatConstant = (modulePrefix, actionName) =>
  `${modulePrefix}/${actionName}`;


const _appendFormattedConstant = curry(
  (modulePrefix, transform) => {
    return {
      ... transform,
      formattedConstant: _formatConstant(modulePrefix, transform.action),
    };
  }
);

export const formatConstants = curry(
  (modulePrefix, transformations) =>
    transformations.map(_appendFormattedConstant(modulePrefix))
);

export default formatConstants;
