import React from 'react';
import { findDOMNode } from 'react-dom';
import { List } from 'immutable';
import { actions } from './module';
import { connect } from 'react-redux';

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
  render() {
    const { todos = [], ... actions } = this.props;
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
                description: findDOMNode(this.refs.description).value,
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

const mapDispatch = dispatch => {
  return {
    createTodo: todo => dispatch(actions.createTodo({todo})),
    destroyTodo: index => dispatch(actions.destroyTodo({index})),
    updateTodo: (index, todo) =>
      dispatch(actions.updateTodo({index, todo})),
  };
}

export default connect(mapState, mapDispatch)(TodoList);
