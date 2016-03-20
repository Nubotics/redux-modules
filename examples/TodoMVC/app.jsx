import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { List, fromJS } from 'immutable';
import TodoList from './TodoList';

import {actions, reducer} from './module';

export const mapState = state => {
  return {
    todos: [... state.toJS()],
  }
};

export const mapDispatch = dispatch => {
  return {
    createTodo: todo => dispatch(actions.createTodo({todo})),
    destroyTodo: index => dispatch(actions.destroyTodo({index})),
    updateTodo: (index, todo) =>
      dispatch(actions.updateTodo({index, todo})),
  };
}

let logger = createLogger({
  stateTransformer: object => fromJS(object).toJS(),
  actionTransformer: object => fromJS(object).toJS(),
  collapsed: true,
  logErrors: false,
});

const createStoreWithMiddleware = compose(
  applyMiddleware(logger)
)(createStore);

const ConnectedTodos = connect(mapState, mapDispatch)(TodoList);

class TodoApp extends React.Component {
  render() {
    const store = createStoreWithMiddleware(reducer, List());
    return (
      <Provider store={store}>
        <ConnectedTodos/>
      </Provider>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#todos');
  render(<TodoApp/>, node);
});
