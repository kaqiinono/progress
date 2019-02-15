/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhancer from './enhancer';
import { propTypes, defaultProps } from './types';

class Circle extends Component {
  getPathStyles(offset, percent, strokeColor, pathWidth, gapDegree = 0, gapPosition) {
    const radius = 50 - (pathWidth / 2);
    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = -2 * radius;
    switch (gapPosition) {
      case 'left':
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;
      case 'right':
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;
      case 'bottom':
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;
      default:
    }
    const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
     a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
     a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
    const len = Math.PI * 2 * radius;

    const pathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
      strokeDashoffset: `-${gapDegree / 2 + offset / 100 * (len - gapDegree)}px`,
      transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s', // eslint-disable-line
    };

    return {
      pathString,
      pathStyle,
    };
  }

  getStokeList() {
    const {
      prefixCls, percent, strokeColor, strokeWidth, trailWidth, strokeLinecap,
      gapDegree, gapPosition,
    } = this.props;
    const percentList = Array.isArray(percent) ? percent : [percent];
    const strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];

    let stackPtg = 0;
    return percentList.map((ptg, index) => {
      const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
      const { pathString, pathStyle } = this.getPathStyles(
        stackPtg, ptg, color, strokeWidth >= trailWidth ? strokeWidth : trailWidth, gapDegree, gapPosition
      );

      stackPtg += ptg;

      return (
        <path
          key={index}
          className={`${prefixCls}-circle-path`}
          d={pathString}
          strokeLinecap={strokeLinecap}
          strokeWidth={ptg === 0 ? 0 : strokeWidth}
          fillOpacity="0"
          style={pathStyle}
          ref={(path) => {
            this.paths[index] = path;
          }}
        />
      );
    });
  }

  paths = {};

  render() {
    const {
      prefixCls, strokeWidth, trailWidth,
      gapDegree, gapPosition, text, textStyle,
      trailColor, strokeLinecap, style, className, ...restProps
    } = this.props;
    const { pathString, pathStyle } = this.getPathStyles(
      0, 100, trailColor, strokeWidth >= trailWidth ? strokeWidth : trailWidth, gapDegree, gapPosition
    );
    delete restProps.percent;
    delete restProps.strokeColor;
    return (
      <div className={`${prefixCls}-circle-main}`}>
        <svg
          className={`${prefixCls}-circle ${className}`}
          viewBox="0 0 100 100"
          style={style}
          {...restProps}
        >
          <defs>
            <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="gradient1">
              <stop offset="0%" stop-color="#e52c5c"></stop>
              <stop offset="100%" stop-color="#ab5aea"></stop>
            </linearGradient>
            <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="gradient2">
              <stop offset="0%" stop-color="#4352f3"></stop>
              <stop offset="100%" stop-color="#ab5aea"></stop>
            </linearGradient>
            <linearGradient x1="0%" y1="0%" x2="100%" y2="0%" id="gradient3">
              <stop offset="0%" stop-color="#2D9AFF"></stop>
              <stop offset="100%" stop-color="#2817E2"></stop>
            </linearGradient>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#2D9AFF"></stop>
              <stop offset="100%" stop-color="#2817E2"></stop>
            </linearGradient>
          </defs>
          <path
            className={`${prefixCls}-circle-trail`}
            d={pathString}
            stroke={trailColor}
            strokeLinecap={strokeLinecap}
            strokeWidth={trailWidth || strokeWidth}
            fillOpacity="0"
            style={pathStyle}
          />
          {this.getStokeList()}
        </svg>
        <span className={`${prefixCls}-circle-text}`}
              style={textStyle}>{text}</span>
      </div>
    );
  }
}

Circle.propTypes = {
  ...propTypes,
  gapPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

Circle.defaultProps = {
  ...defaultProps,
  gapPosition: 'top',
};

export default enhancer(Circle);
