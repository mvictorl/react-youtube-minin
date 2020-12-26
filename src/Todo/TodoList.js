import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from "./TodoItem"

const styles = {
  ul: {
    listStyle: 'none', // list-style CSS
    margin: 0,
    padding: 0
  }
}

const TodoList = (props) => {
  return (
    <ul style={styles.ul}>
      {props.todos.map((todo,index) => (
        // <TodoItem key={ todo.id }>
        //   <strong>{ index + 1}.</strong> { todo.title }
        // </TodoItem>
        <TodoItem
          todo={todo}
          index={index}
          chkBoxChange={props.onToggle}
          key={todo.id}
        />
      ))}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired
}

export default TodoList