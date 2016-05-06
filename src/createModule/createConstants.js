import { reduce } from 'ramda';
import camelize from 'camel-case';

const _generateConstants = (generatedConstants, transformation) => {
  const { formattedConstant, action } = transformation;
  const camelizedActionName = camelize(action);

  generatedConstants[camelizedActionName] = formattedConstant;
  return generatedConstants;
};

export const createConstants = transformations => {
  return reduce(_generateConstants, {}, transformations);
};

export default createConstants;
