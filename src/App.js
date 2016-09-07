import React, { Component } from 'react';
import './App.css';
import { get } from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      containers: []
    }
  }
  componentWillMount() {
    setInterval(() => {
      get('http://' + window.location.hostname + ':9000/containers/json').then(c => {
        this.setState({
          containers: c.data
        })
      })

    }, 1000)
  }
  render() {
    return (
      <div className="App">
        <h1>Hyper Dashboard</h1>
        <div className='Containers'>
          {this.state.containers.map((c, key) => {
            return (
              <div className='Container' key={key}>
                <div>
                  {c.Command}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
