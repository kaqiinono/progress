import React, { Component } from 'react';
import enhancer from './enhancer';
import { propTypes, rectDefaultProps } from './types';

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
    } = this.props;

    const strokeColor = this.props.strokeColor || `url("#gradient${gradientColor.length}")`;


    return (
      <svg
        className={`${prefixCls}-rect ${className}`}
        style={style}
      >
        <defs>
          {
            gradientColor.length > 3 &&
            <linearGradient id={`gradient${gradientColor.length}`} x1="0%" y1="0%" x2="100%" y2="0%">
              {
                gradientColor.map((color, index) => {
                  if (index !== gradientColor.length - 1) {
                    const offset = `${Math.round(100 / gradientColor.length) * index}%`;
                    return <stop offset={offset} style={{ stopColor: color, stopOpacity: 1 }}></stop>;
                  }
                  return <stop offset="100%" style={{ stopColor: color, stopOpacity: 1 }}></stop>;
                })
              }
            </linearGradient>
          }
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

Rect.defaultProps = rectDefaultProps;

export default enhancer(Rect);
