import React from 'react';
import {connect} from 'react-redux';
import {updateCurrent, saveTodo} from '../reducers/todo';

const TodoForm = (props) => {
  const {currentTodo, updateCurrent, saveTodo} = props
  const handleInputChange = (event) => {
    const val = event.target.value;
    updateCurrent(val);
  }

  const handleSubmit = (event) => {
    // event.stopImmidiatePropagation();
    event.preventDefault();
    saveTodo(currentTodo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="test" 
        value={currentTodo}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default connect(
  (state) => ({currentTodo: state.todo.currentTodo}),
  {updateCurrent, saveTodo}
)(TodoForm);