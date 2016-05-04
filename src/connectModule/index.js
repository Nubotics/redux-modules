import _connectModule from './connectModule';
import { curry } from 'ramda';

export const connectModule = (selector, module, Component) => {
  const { actions, name: namespace } = module;

  const ConnectedComponent = _connectModule(
    {
      namespace,
      actions,
      selector,
    },
    Component
  );

  return ConnectedComponent;
}

export default curry(connectModule);
