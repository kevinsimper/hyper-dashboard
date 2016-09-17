import React, { Component } from 'react'
let io = window.io

export default class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      logs: []
    }
  }
  componentDidMount() {
    this.socket = io.connect('http://localhost:9000');
    this.socket.emit('startlogs', { container: this.props.activeContainer })
    this.socket.on('logs', (data) => {
      let oldLogs = this.state.logs.slice()
      oldLogs.push(data)
      this.setState({
        logs: oldLogs
      })
    })
  }
  componentWillUnmount() {
    this.socket.emit('stoplogs')
    this.socket.close()
  }
  render() {
    return (
      <div className='App_Sidebar'>
        <h1>Logs for {this.props.activeContainer}</h1>
        <pre>
          {this.state.logs.map((l, key) => <div key={key}>{l}</div>)}
        </pre>
      </div>
    )
  }
}
