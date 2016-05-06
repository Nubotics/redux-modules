# redux-modules [![Circle CI](https://circleci.com/gh/mboperator/redux-modules/tree/master.svg?style=svg)](https://circleci.com/gh/mboperator/redux-modules/tree/master)

A library that takes the [Redux module](https://github.com/erikras/ducks-modular-redux) concept to another level with:
- an **intuitive** way define actions and state transformations
- **propType style typechecking** for action payloads
![Example](https://raw.githubusercontent.com/mboperator/redux-modules/master/examples/screenshots/payloadTypes.png "redux-modules")
- auto generated, **camelCased** action creators
- auto prefixed action constants
- and a decorator to easily drop module capabilities in to your view

## Example
```js
// src/_shared/modules/todos.js
import { PropTypes } from 'react';
const { shape, string, number } = PropTypes;
import createModule from 'redux-modules';
import { fromJS, List } from 'immutable';

export const { actions, reducer, constants } = createModule({
  name: 'todos',
  initialState: List(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        todo: shape({
          description: string.isRequired,
        }),
      },
      reducer: (state, {payload: { todo }}) => {
        return state.update(
          'collection',
          todos => todos.push(fromJS(todo))
        );
      },
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        index: number.isRequired,
      },
      reducer: (state, {payload: { index }}) => {
        return state.update(
          'collection',
          todos => todos.delete(index)
        );
      },
    },
  ],
});

export default reducer;

// src/views/events/List.jsx
@connectModule(state => state.get('todos').toJS(), todoModule)
export default class TodoList extends Component {
  static propTypes = {
    todos: shape({
      // exposed by selector
      collection: array,
      // actions from module w/ bound dispatch
      actions: shape({
        create: func,
        destroy: func,
      }),
    }),
  };
```
# Documentation

### createModule({ name, initialState, transformations })
```js
const { actions, reducer, constants } = createModule({
  name: 'users',
  initialState: {},
  transformations: [ /* array of transformation objects */ ],
});
```
### parameters:
- name (_string_): Name of module, used to prefix action types.
- transformations (_array_): Array of `transformation` objects.
- initialState (_any_): Initial store state. Defaults to immutable Map if undefined

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
#### Attributes:
- action (_string_): Action constant
- payloadTypes (_object_): Like React PropTypes, but for your action payload.
- reducer (_function(state, action)_): State transformation that corresponds to the action

## connectModule(selector, module, Component)
```js
@connectModule(state => state.get('todos').toJS(), todoModule)
```
### Parameters
- selector _(function)_: A function that receives state, props, and returns an object
- module _(object)_: A redux module object
- Component _(function or class)_: A React Component
