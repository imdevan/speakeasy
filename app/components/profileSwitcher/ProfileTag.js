import React from 'react';

const ProfileTag = ({className='', active = false, label, id, onClick=()=>{}}, key) => {
  const  _className = `c-tag ${active ? 'c-tag-active' : ''}`;

  if(!label) {
    return null
  }

  return (
    <div key={key} className={`${_className} ${className}`} onClick={onClick}>
      {label}
    </div>
  )
}

export default ProfileTag
