import React from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
// TodoList View
const TodoItem = (actions, {id, title, description, checked}, i) =>
  <li>
    <div className="checkbox">
      <input
        onChange={e =>
          actions.updateTodo(i, {checked: e.target.checked})
        }
        type='checkbox'
        value={checked}
      />
    </div>
    <p>
      {description}
    </p>
    <aside>
      <button onClick={() => actions.destroyTodo(i)}>
        Delete Todo
      </button>
    </aside>
  </li>

export default class TodoList extends React.Component {
  render() {
    const { todos = List(), ... actions } = this.props;
    return (
      <div>
        <h1>Todo!</h1>

        <div>
          <label>Todo</label>
          <input ref='name'/>
          <label>Description</label>
          <input ref='description'/>

          <input type='button' onClick={() => {
            actions.createTodo({
              name: findDOMNode(this.refs.name).value,
              description: findDOMNode(this.refs.description).value,
            })
          }}>
            Create Todo!
          </input>
        </div>

        <ul>
          {todos.map(TodoItem.bind(null, actions))}
        </ul>
      </div>
    );
  }
}

