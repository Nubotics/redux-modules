import todoModule from './module';
import { connectModule } from '../../src/index';
import TodoList from './TodoList';

const mapState = state => {
  return {
    todos: [... state.toJS()],
  }
};

export default connectModule(
  mapState,
  todoModule,
  TodoList
);
