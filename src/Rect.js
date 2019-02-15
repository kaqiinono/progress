import React, { Component } from 'react';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

class Rect extends Component {

  render() {
    const {
      className,
      prefixCls,
      strokeStyles,
      strokeWidth,
      style,
      gradientColor,
      rectWidth,
      rectHeight,
      ...restProps,
    } = this.props;

    const strokeColor = this.props.strokeColor || 'url("#gradient")';


    return (
      <svg
        className={`${prefixCls}-rect ${className}`}
        style={style}
        {...restProps}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: gradientColor[0], stopOpacity: 1 }}></stop>
            <stop offset="100%" style={{ stopColor: gradientColor[1], stopOpacity: 1 }}></stop>
          </linearGradient>
        </defs>
        <rect
          width={rectWidth}
          height={rectHeight}
          style={{ fill: strokeColor, strokeWidth, ...strokeStyles }} />
      </svg>
    );
  }
}

Rect.propTypes = propTypes;

Rect.defaultProps = defaultProps;

export default enhancer(Rect);
