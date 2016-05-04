import createInterface from './createInterface';
import { curry } from 'ramda';

export const connectModule = (selector, module, Component) => {
  const { actions, name } = module;

  const Interface = createInterface(
    {
      name,
      actions,
      selector,
    },
    Component
  );

  return Interface;
}

export default curry(connectModule);
