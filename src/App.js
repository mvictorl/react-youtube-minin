import React, { useState, useEffect } from 'react'
import TodoList from "./Todo/TodoList"
import Context from "./context"
// import AddTodo from "./Todo/AddTodo"
import Loader from "./Loader"
import Modal from "./Modal/Modal"

// LazyLoading AddTodo component
const AddTodo = React.lazy(() =>
  // import('./Todo/AddTodo')
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./Todo/AddTodo'))
    }, 2000)
  })
)

function App() {
  const [ todos, setTodos ] = useState([
    // { id: 1, completed: false, title: 'Купить хлеб' },
    // { id: 2, completed: true, title: 'Оплатить комуналку' },
    // { id: 3, completed: false, title: 'Заправить машину' }
  ])
  const [ loading, setLoading ] = useState(true)

  // After DOM generate start ONCE - [] as second parameter (deps)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => res.json())
      .then(todos => {
        setTodos(todos)
        setLoading(false)
        // setTimeout(() => {
        //   setTodos(todos)
        //   setLoading(false)
        // }, 3000)
      })
  }, [])

  function onCheckBoxToggle(id) {
    setTodos(todos.map(todo => {
        if (todo.id === id)
          todo.completed = !todo.completed
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([ {
      id: Date.now(),
      title,
      completed: false
    } ]))
  }

  return (
    <Context.Provider value={ { removeTodo } }>
      <div className="wrapper">
        <h1 style={ { marginBottom: '20px' } }>React tutorial</h1>

        <Modal />

        {/* Lazy loading AddTodo component*/ }
        <React.Suspense fallback={<p style={ { marginBottom: '1rem' } }><i>Loading...</i></p>}>
          <AddTodo onCreate={ addTodo }/>
        </React.Suspense>

        { loading && <Loader/> }
        { todos.length
          ? <TodoList todos={ todos } onToggle={ onCheckBoxToggle }/>
          : loading ? null : <p style={ { color: 'red' } }>No todos!</p>
        }

      </div>
    </Context.Provider>
  )
}

export default App