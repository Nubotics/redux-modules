import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {
  ConnectedTodos,
  ModuleConnectedTodos,
} from './TodoList';

import store from './store';

class TodoApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ConnectedTodos />
          <ModuleConnectedTodos />
        </div>
      </Provider>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.querySelector('#todos');
  render(<TodoApp/>, node);
});
