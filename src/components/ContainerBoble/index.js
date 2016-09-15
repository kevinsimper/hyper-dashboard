import React, { Component } from 'react'

export default class ContainerBoble extends Component {
  render() {
    const { data } = this.props
    return (
      <div className='Container'>{data.Command}</div>
    )
  }
}
