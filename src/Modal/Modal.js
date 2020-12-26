import React, { Component } from 'react'
import './Modal.css'

class Modal extends Component {
  state = {
    isOpen: false
  }

  render() {
    return (
      <>
        <button onClick={ () => this.setState({ isOpen: true }) }>
          Open Modal
        </button>

        { this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h1>Modal title</h1>
              <p>I am modal window</p>

              <button onClick={ () => this.setState({ isOpen: false }) }>
                Close Modal
              </button>
            </div>
          </div>
        ) }
      </>
    )
  }
}

export default Modal