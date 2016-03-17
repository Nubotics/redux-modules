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
      {items.toJS().map(TodoItem.bind(null, actions))}
    </ul>
  </div>
