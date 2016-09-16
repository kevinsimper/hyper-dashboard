import React, { Component } from 'react'

export default class Sidebar extends Component {
  render() {
    return (
      <div className='App_Sidebar'>
        <h1>Logs for {this.props.activeContainer}</h1>
      </div>
    )
  }
}
