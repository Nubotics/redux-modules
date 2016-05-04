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
          actions.update({
            index: i,
            todo: {checked: e.target.checked},
          })
        }
        type='checkbox'
        checked={checked}
      />
    </div>
    <p>
      {description}
    </p>
    <aside>
      <button onClick={() => actions.destroy({index: i})}>
        Delete Todo
      </button>
    </aside>
  </li>

class TodoList extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
  };

  render() {
    const { title, todos: todoProps } = this.props;
    const { todos = [], actions } = todoProps ;

    return (
      <div>
        <h1>{title}</h1>

        <div>
          <label>Description</label>
          <input ref='description'/>

          <input
            type='button'
            value='Create'
            onClick={() => {
              actions.create({
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

const mapDispatch = dispatch => {
  return {
    create: ({todo}) =>
      dispatch(actions.create({todo})),
    destroy: ({index}) =>
      dispatch(actions.destroy({index})),
    update: ({index, todo}) =>
      dispatch(actions.update({index, todo})),
  };
};

const namespaceProps = (state, actions, props) => {
  return { ... props, todos: { actions, ... state } };
};

export const ConnectedTodos = connect(mapState, mapDispatch, namespaceProps)(TodoList);
export const ModuleConnectedTodos = connectModule(mapState, todoModule, TodoList);
