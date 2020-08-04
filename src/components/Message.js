import React from 'react';
import {connect} from 'react-redux'

const Message = ({message}) => {
  return (
    message ? <span className='message'>{message}</span> : null
  )
}


export default connect((state) => ({message: state.message}))(Message);