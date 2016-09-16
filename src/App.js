import React, { Component } from 'react';
import './App.css';
import { get } from 'axios';
import { TransitionMotion, spring } from 'react-motion'
import ContainerBoble from './components/ContainerBoble'

class App extends Component {
  constructor() {
    super()
    this.state = {
      containers: []
    }
  }
  componentWillMount() {
    this.getData()
    setInterval(this.getData, 10000)
  }
  getData() {
    get('http://' + window.location.hostname + ':9000/containers/json').then(c => {
      this.setState({
        containers: c.data
      })
    })
  }
  getDefaultStyles() {
    return this.state.containers.map((c, key) => ({...c, key: key + '', style: {x: 0}}));
  }
  getStyles() {
    return this.state.containers.map((c, key) => ({
      key: key + '',
      data: c,
      style: {
        x: spring(1)
      }
    }))
  }
  willEnter() {
    return {x: 0};
  }
  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {x: spring(0)};
  }
  render() {
    if(this.state.containers.length === 0) return <div><h1>Hyper Dashboard</h1></div>;
    return (
      <div className="App">
        <div className='App_Header'>
          <h1>Hyper Dashboard</h1>
        </div>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          styles={this.getStyles()}>
          {interpolatedStyles => {
              return (
                // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                <div className='Containers'>
                {interpolatedStyles.map(config => {
                  return (
                    <div key={config.key} style={{transform: `scale(${config.style.x})`}}>
                      <ContainerBoble data={config.data}/>
                    </div>
                  )
                })}
                </div>
              )
            }
          }
        </TransitionMotion>
      </div>
    );
  }
}

export default App;
