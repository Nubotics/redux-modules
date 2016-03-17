import { createModule } from 'redux-modules';
import { fromJS } from 'immutable';

export const module = createModule(
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
      reducer: (state, {payload: { index, todo }}) => {
        return state.replace(index, todo);
      },
    },
  ],
);

