/*
  state = [
    {
      description,
      index
    }
  ]
 */

import createModule from '../../src/index';
import {PropTypes} from 'react';
import { fromJS, List } from 'immutable';

export default createModule({
  name: 'todos',
  initialState: List(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        todo: PropTypes.shape({
          description: PropTypes.string.isRequired,
        }),
      },
      reducer: (state, {payload: { todo }}) => {
        return state.push(fromJS(todo));
      },
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        index: PropTypes.number.isRequired,
      },
      reducer: (state, {payload: { index }}) => {
        return state.delete(index);
      },
    },
    {
      action: 'UPDATE',
      payloadTypes: {
        index: PropTypes.number.isRequired,
        todo: PropTypes.shape({
          description: PropTypes.string,
          checked: PropTypes.bool,
        }),
      },
      reducer: (state, {payload: { index, todo: updates }}) => {
        return state.update(
          index,
          todo => todo.merge(fromJS(updates))
        );
      },
    },
  ],
});
