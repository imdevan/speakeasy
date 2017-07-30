import React from 'react';
import PropTypes from 'prop-types';
import project from '../config/project';

const BackLink = ({to, children}) => {
  const link = to.includes('http://') ||  to.includes('https://') ?
    to : `http://${to}`;

  return <a href={link} target='_blank'>
    {children}
  </a>
};

BackLink.propTypes = {
  to: PropTypes.string,
  childreN: PropTypes.element
}

BackLink.defaultProps = {
  to: project.url,
  children: null
}

export default BackLink;
