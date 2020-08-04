import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Message from './components/Message'
import Footer from './components/Footer'

const App = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to React with Redux
        </p>
        <div className="todo-app">
          <Router>
            <Message />
            <TodoForm />
            <Route path="/:filter?" render={({match}) => (
              <TodoList filter={match.params.filter} />
            )} />
            <Footer />
          </Router>
        </div>
      </header>
    </div>
  );
}

// export default App;


////map state to props takes an object (the entire state) and returns an object which is the subset of the state we want to have access too (in this case the whole thing)
// const mapStateToProps = (state) => state
// //map dispatchtoprops accepts the dispatch method from our store and returns an object that contains dispatch functions, similar to mapstatetoprops
// const mapDispatchToProps = {updateCurrent}
// const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
// export default ConnectedApp


export default App;