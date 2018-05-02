import React from 'react';

const DropDown = ({options}) => {
  const renderOption = (option) => (

  )

  return(
    <div className='position-absolute'>
      {options.map(renderOption)}
    </div>
  )
};

DropDown.defaultProps = {
  options: []
};

export default DropDown;
