import React, { Component } from 'react';
import './App.css';
import { get } from 'axios';
import ContainerBubbles from './components/ContainerBubbles'

class App extends Component {
  constructor() {
    super()
    this.state = {
      containers: []
    }
  }
  componentWillMount() {
    this.getData()
    setInterval(this.getData.bind(this), 10000)
  }
  getData() {
    get('http://' + window.location.hostname + ':9000/containers/json').then(c => {
      this.setState({
        containers: c.data
      })
    })
  }
  onClickContainer(containerId) {
    this.setState({
      activeContainer: containerId
    })
  }
  render() {
    if(this.state.containers.length === 0) return <div><h1>Hyper Dashboard</h1></div>;
    return (
      <div className="App">
        <div className='App_Header'>
          <h1>Hyper Dashboard</h1>
        </div>
        <div className='App_Main'>
          <div className='App_Content'>
            <ContainerBubbles containers={this.state.containers} onClickContainer={this.onClickContainer.bind(this)}/>
          </div>
          <div className='App_Sidebar'>Sidebar</div>
        </div>
      </div>
    );
  }
}

export default App;
