import {getTodos, createTodo, updateTodo, deleteTodo} from '../lib/todoServices';
import {showMessage} from './messages';

const initState = {
  todos: [],
  currentTodo: ''
}

export const CURRENT_UPDATE = 'CURRENT_UPDATE';
export const TODOS_LOAD = 'TODOS_LOAD'
export const TODO_ADD = 'TODO_ADD';
export const TODO_REPLACE = 'TODO_REPLACE';
export const TODO_REMOVE = 'TODO_REMOVE';

export const updateCurrent = (val) => ({type: CURRENT_UPDATE, payload: val});
export const loadTodos = (todos) => ({type: TODOS_LOAD, payload: todos});
export const addTodo = (todo) => ({type: TODO_ADD, payload: todo});
export const replaceTodo = (todo) => ({type: TODO_REPLACE, payload: todo})
export const removeTodo = (id) => ({type: TODO_REMOVE, payload: id})

// getTodos and createTodo are from 'todoServices.js' => using thunk middleware to asynchronously save them to the DB 
export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(showMessage('Loading Todos...'))
    getTodos()
      .then(todos => dispatch(loadTodos(todos)));
  }
}
export const saveTodo = (name) => {
  return (dispatch) => {
    dispatch(showMessage('Saving Todo...'))
    createTodo(name)
      .then((res) => dispatch(addTodo(res)));
  }
}
export const toggleTodo = (id) => {
  return (dispatch, getState) => {
    dispatch(showMessage('Saving todo update...'))
    const {todos} = getState().todo; //thunk middleware gives access to getState here too!
    const todo = todos.find((todo) => id === todo.id)
    const toggledTodo = {...todo, isComplete: !todo.isComplete}
    updateTodo(toggledTodo)
      .then((res) => dispatch(replaceTodo(res)))
  }
}
export const destroyTodo = (id) => {
  return (dispatch) => {
    dispatch(showMessage('Deleting todo...'))
    deleteTodo(id)
      .then(() => dispatch(removeTodo(id)))
  }
}

export const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'active':
      return todos.filter(t => !t.isComplete)
    case 'completed':
      return todos.filter(t => t.isComplete)
    default:
      return todos
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case TODO_REMOVE:
      return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)}
    case TODO_REPLACE:
      return {...state, todos: state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)}
    case TODO_ADD:
      return {...state, currentTodo: '', todos: state.todos.concat(action.payload)}
    case TODOS_LOAD:
      return {...state, todos: action.payload}
    case CURRENT_UPDATE:
      return {...state, currentTodo: action.payload}
    default: 
    return state;
  }
}