import React from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import { connect } from 'react-redux';

import todoModule from './module';
import { connectModule } from '../../src/index';
const { actions } = todoModule;

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

class TodoList extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
  };

  render() {
    const { todos = [], actions } = this.props;
    return (
      <div>
        <h1>Todo!</h1>

        <div>
          <label>Description</label>
          <input ref='description'/>

          <input
            type='button'
            value='Create'
            onClick={() => {
              actions.createTodo({
                todo: {
                  description: findDOMNode(this.refs.description).value,
                }
              })
            }}
          />
        </div>

        <ul>
          {todos.map(TodoItem.bind(null, actions))}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  return {
    todos: [... state.toJS()],
  }
};

// export default connect(mapState, mapDispatch)(TodoList);
export default connectModule(mapState, todoModule, TodoList);
