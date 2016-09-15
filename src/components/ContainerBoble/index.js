import React, { Component } from 'react'
import './style.css'

export default class ContainerBoble extends Component {
  render() {
    const { data } = this.props
    return (
      <div className='Container'>
        <div>{data.Image}</div>
        <div>{data.Command}</div>
        <div>{data.Status}</div>
        <div><a href={'http://' + data.Labels['sh.hyper.fip']}>{data.Labels['sh.hyper.fip']}</a></div>
      </div>
    )
  }
}
