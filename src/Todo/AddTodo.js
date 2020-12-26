import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Own hook `useInputValue`
function useInputValue(defaultValue = '') {
  const [ value, setValue ] = useState(defaultValue)
  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    value: () => value,
    clear: () => setValue('')
  }
}


const AddTodo = ({ onCreate }) => {
  // const [ value, setValue ] = useState('')
  const input = useInputValue('')

  const submitHandler = (event) => {
    event.preventDefault()
    if (input.value().trim()) {
      onCreate(input.value())
      input.clear()
    }
  }

  return (
    <form
      style={ { marginBottom: '1rem' } }
      onSubmit={ submitHandler }
    >
      <input
        // value={ value }
        // onChange={ event => setValue(event.target.value) }
        { ...input.bind }
      />
      <button type="submit">Add todo</button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo