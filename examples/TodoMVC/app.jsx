import React from 'react';
import { Provider, connect } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore } from 'redux';
import { Map } from 'immutable';

import {actions, reducer} from './module';

export const mapState = state => {
  return {
    todos: ... state.toJS(),
  }
};

export const mapDispatch = dispatch => {
  return {
    createTodo: todo => dispatch(actions.createTodo({todo})),
    destroyTodo: index => dispatch(actions.destroyTodo({id})),
    updateTodo: todo => dispatch(actions.updateTodo({todo})),
  };
}

const ConnectedTodos = connect(mapState, mapDispatch);

class TodoApp extends React.Component {
  render() {
    const store = createStore(reducer, Map());
    return (
      <Provider store={store}>
        <ConnectedTodos/>
      </Provider>
    );
  }
}
