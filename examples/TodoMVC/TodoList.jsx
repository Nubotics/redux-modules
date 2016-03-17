// TodoList View
const TodoItem = (actions, {id, title, description, complete}, i) =>
  <li>
    <div className="checkbox">
      <input
        onChange={e =>
          actions.updateTodo(i, {status: e.target.checked})
        }
        type='checkbox'
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

export default const TodoList = ({items, ... actions}) =>
  <div>
    <h1>Todo!</h1>

    <div>
      <input ref='name'/>
      <input ref='description'/>

      <button onClick={e => {
        actions.createTodo({
          name: findDOMNode(this.refs.name).value,
          descripton: findDOMNode(this.refs.descripton).value,
        });
      }}>
      </button>
    </div>

    <ul>
      {items.toJS().map(TodoItem(actions))}
    </ul>
  </div>
