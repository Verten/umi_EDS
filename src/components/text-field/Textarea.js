import React, { Component } from 'react'
import './styles/styles.less'

export default class Input extends Component {
  render() {
    return (
      <textarea {...this.props}></textarea>
    )
  }
}
