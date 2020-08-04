import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchTodos, toggleTodo, destroyTodo, getVisibleTodos} from '../reducers/todo';
import { deleteTodo } from '../lib/todoServices';

const TodoItem = ({id, name, isComplete, toggleTodo, destroyTodo}) => (
  <li>
    <span className='delete-item'>
      <button onClick={() => destroyTodo(id)}>X</button>
    </span>
    <input type="checkbox" 
    checked={isComplete} 
    onChange={() => toggleTodo(id)} />
    {name}
  </li>
);


const TodoList = (props) => {
  console.log(props)
  const {fetchTodos} = props;
  useEffect(fetchTodos, []);

  // useEffect(() => {
  //   fetchTodos();
  // }, [])
  
  return (          
  <div className="todo-list">
    <ul>
      {props.todos.map(todo => (
        <TodoItem {...todo} key={todo.id} toggleTodo={props.toggleTodo} destroyTodo={props.destroyTodo} />
      ))}
    </ul>
  </div>
  )
}

export default connect(
  (state, ownProps) => ({todos: getVisibleTodos(state.todo.todos, ownProps.filter)}), 
  {fetchTodos, toggleTodo, destroyTodo}
)(TodoList)