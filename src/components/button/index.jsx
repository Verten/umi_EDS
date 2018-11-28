import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash'
import styles from './styles.less'

export class Button extends Component {
  static propTypes = {
    theme: PropTypes.string,
    primary: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    warning: PropTypes.bool,
    icon: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.any]),
  }

  render() {
    const { icon, children, primary, disabled, warning, onClick, theme = 'light' } = this.props
    return (
      <div className={styles[theme]}>
        <button
          className={`${styles.btn} ${primary ? styles.primary : ''} ${warning ? styles.warning : ''}`}
          disabled={disabled}
          onClick={onClick}>
          {!isUndefined(icon) ? <i className={`${styles.icon} ${styles[icon]}`} /> : null}
          {children}
        </button>
      </div>
    )
  }
}

export default Button
