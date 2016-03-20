import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import ConnectedTodos from './TodoList';
import store from './store';

class TodoApp extends React.Component {
  render() {
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
