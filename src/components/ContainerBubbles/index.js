import React, { Component } from 'react'
import { TransitionMotion, spring } from 'react-motion'
import ContainerBoble from '../ContainerBoble'

export default class ContainerBubbles extends Component {
  getDefaultStyles() {
    return this.props.containers.map((c, key) => ({...c, key: key + '', style: {x: 0}}));
  }
  getStyles() {
    return this.props.containers.map((c, key) => ({
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
    return (
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
                <ContainerBoble data={config.data} onClick={this.props.onClickContainer}/>
                </div>
              )
            })}
            </div>
          )
        }}
      </TransitionMotion>
    )
  }
}
