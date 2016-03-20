import createModule from '../../src/index';
import { fromJS, List } from 'immutable';

module.exports = createModule(
  'todos',
  [
    {
      action: 'CREATE_TODO',
      reducer: (state, {payload: { todo }}) => {
        return state.push(fromJS(todo));
      },
    },
    {
      action: 'DESTROY_TODO',
      reducer: (state, {payload: { index }}) => {
        return state.delete(index);
      },
    },
    {
      action: 'UPDATE_TODO',
      reducer: (state, {payload: { index, todo: updates }}) => {
        return state.update(
          index,
          todo => todo.merge(fromJS(updates))
        );
      },
    },
  ],
  List()
);
