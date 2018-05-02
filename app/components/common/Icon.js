import React from 'react';

const Icon = ({ icon = '', className = '', mod = '', onClick=()=>{}}) => {
  return <i className={`fa${mod} fa-${icon} ${className}`} onClick={onClick}/>
}

export default Icon;
