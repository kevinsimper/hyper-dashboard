import React, { Component } from 'react'
import './style.css'

export default class ContainerBoble extends Component {
  render() {
    const { data } = this.props
    const PublicPort = (data.Ports.length > 0 && data.Labels['sh.hyper.fip']) ? data.Ports[0].PublicPort : ''
    return (
      <div className='Container' onClick={() => { this.props.onClick(data.Id)}}>
        <div>{data.Image}</div>
        <div>{data.Command}</div>
        <div>{data.Status}</div>
        <div>
          {data.Ports.map(p => {
            return <div key={p.PrivatePort}>{p.PrivatePort}:{p.PublicPort}</div>
          })}
        </div>
        {data.Labels['sh.hyper.fip'] &&
          <div>
            <a href={'http://' + data.Labels['sh.hyper.fip'] + ':' + PublicPort}>{data.Labels['sh.hyper.fip'] + ':' + PublicPort}</a>
          </div>
        }
      </div>
    )
  }
}
