import React from 'react';

const Icon = ({icon='', className='', onClick=()=>{}}) => {
  return <i className={`fa fa-${icon} ${className}`} onClick={onClick}/>
}

export default Icon;