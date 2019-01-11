import React, { Component, Fragment } from 'react'
import styles from './styles/styles.less'
import { uniqueId } from 'lodash'

export default class Input extends Component {
  renderLabel(label, id) {
    if (label) {
      const { text, pos } = label
      return (
        <label id={id} className={pos}>{text}</label>
      )
    }
    return ''
  }
  renderSuffix(suffix, icon) {
    if (suffix) {
      return (
        <Fragment>
          {' '}
          <div className={`${styles.suffix} ${ icon ? styles['icon-inside'] : '' }`}>
            {icon ? <i className={`icon ${icon}`}></i> : suffix}
          </div>
        </Fragment>
      )
    }
    return ''
  }
  renderPrefix(prefix, icon) {
    if (prefix) {
      return (
        <Fragment>
          <div className={`${styles.prefix} ${ icon ? styles['icon-inside'] : '' }`}>
            {icon ? <i className={`icon ${icon}`}></i> : prefix}
          </div>
          {' '}
        </Fragment>
      )
    }
    return ''
  }
  render() {
    const {
      prefix, suffix, label, icon, type = '',
      id = `eds-input-${uniqueId()}`,
      ...inputProps
    } = this.props
    return (
      <Fragment>
        {this.renderLabel(label, id)}
        {this.renderPrefix(prefix, icon)}
        <input
          {...inputProps}
          className={`${type} ${icon ? styles['with-icon'] : ''}`}
          id={id} />
        {this.renderSuffix(suffix, icon)}
      </Fragment>
    )
  }
}
