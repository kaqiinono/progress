import PropTypes from 'prop-types';

export const defaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1,
  gradientColor: ['#2D9AFF', '#2817E2'],
  rectWidth: 150,
  rectHeight: 150,
};

const mixedType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const propTypes = {
  className: PropTypes.string,
  percent: PropTypes.oneOfType([mixedType, PropTypes.arrayOf(mixedType)]),
  prefixCls: PropTypes.string,
  strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  strokeLinecap: PropTypes.oneOf(['butt', 'round', 'square']),
  strokeWidth: mixedType,
  style: PropTypes.object,
  trailColor: PropTypes.string,
  trailWidth: mixedType,
  gradientColor: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  rectWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rectHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
