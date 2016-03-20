# redux-modules
A library for defining clear, boilerplate free Redux reducers with typechecked action payloads. Based on the [redux duck](https://github.com/erikras/ducks-modular-redux) paradigm proposed by [erikras](https://github.com/erikras/).

## Advantages
- Proptype checking for your action payloads.
- Generate new actions quickly and easily
- Automatic action name convention (camel cased)
- Auto prefixed action types

## Usage
```js
const {actions, reducer} = createModule(actionPrefix, transformations, initialState);
```
### Arguments:
- **actionPrefix**: Prefix for action type
- **transformations**: Array of `transformation` objects.
- **initialState**: Initial store state. Defaults to immutable Map if undefined

### Transformation Object
```js
{
  action: 'CREATE_TODO',
  payloadTypes: {
    todo: PropTypes.shape({
      description: PropTypes.string.isRequired,
    }).isRequired,
  },
  reducer: (state, {todo}) => state.set(todo.id, todo),
},
```
##### Attributes:
- **action**: Action constant
- **payloadTypes**: Like React PropTypes, but for your action payload.
- **reducer**: State transformation that corresponds to the action

## Example
```js
import {PropTypes} from 'react';
import createModule from 'redux-modules';
import { fromJS, List } from 'immutable';

export default createModule(
  'todos',
  [
    {
      action: 'CREATE_TODO',
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
      action: 'DESTROY_TODO',
      payloadTypes: {
        index: PropTypes.number.isRequired,
      },
      reducer: (state, {payload: { index }}) => {
        return state.delete(index);
      },
    },
    {
      action: 'UPDATE_TODO',
      payloadTypes: {
        index: PropTypes.number.isRequired,
        todo: PropTypes.shape({
          description: PropTypes.string,
          completed: PropTypes.bool,
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
  List()
);
```

Equivalent reducer with module/duck paradigm:
```js
import { createAction, handleActions } from 'redux-actions';
import { List } from 'immutable';

const CREATE_TODO = 'todos/CREATE_TODO';
const DESTROY_TODO = 'todos/DESTROY_TODO';
const UPDATE_TODO = 'todos/UPDATE_TODO';

const createTodo = createAction(CREATE_TODO);
const removeTodoItem = createAction(DESTROY_TODO);
const completeTodoItem = createAction(UPDATE_TODO);

export const reducer = handleActions(
  {
    [CREATE_TODO]: (state, {payload: {todo}}) => state.push(todo),
    [DESTROY_TODO]: (state, {payload: {index}}) => state.delete(index),
    [UPDATE_TODO]: (state, {payload: {index}}) => state.update(
      index,
      todo => todo.merge(fromJS(updates))
    );
  },
  List()
);

export const actions = {
  createTodo,
  removeTodoItem,
  completeTodoItem,
};
```
