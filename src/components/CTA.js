import React from 'react';
import { Link } from 'react-router-dom';


const CTA = ({className = '', label='', to=''}) => {
    return <Link className={`${className} c-cta`} to={to}>
        {label}
    </Link>
};

export default CTA;