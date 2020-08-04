import { TODO_ADD, TODOS_LOAD, TODO_REPLACE, TODO_REMOVE } from './todo'

const MESSAGE_SHOW = 'MESSAGE_SHOW';

export const showMessage = (message) => ({type: MESSAGE_SHOW, payload: message})

const messageReducer = (state = '', action) => {
  switch(action.type) {
    case TODO_REMOVE:
      return ''
    case TODO_REPLACE:
      return ''
    case MESSAGE_SHOW:
      return action.payload
    case TODOS_LOAD:
      return ''
    case TODO_ADD:
      return ''
    default:
      return state
  }
}

export default messageReducer;