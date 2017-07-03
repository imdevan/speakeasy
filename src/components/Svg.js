import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({src, className, onClick, width, height, size, style}) => {
  const svgStyle = {
    ...style,
    width: size || width,
    height: size || height
  }

  const getSvg = src => {
    return {__html: src};
  }

  return (
    <div dangerouslySetInnerHTML={getSvg(src)}
      className={`svg ${className}`}
      style={svgStyle}
      onClick={onClick || null}/>
  );
}

Svg.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object
}

Svg.defaultProps = {
  className: '',
  onClick: () => {},
  style: {}
}

export default Svg;
