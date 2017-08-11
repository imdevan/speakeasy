import React from 'react';
import { Link } from 'react-router-dom';
import ReactDisqusThread from 'react-disqus-thread';


const Disqus = ({
    className = '', 
    shortName = '',
    title = '',
    url = ''}) => {
    return <ReactDisqusThread
        className={className}
        shortname={shortName}
        title={title}
        identifier={url}
        url={url}/>
};

export default Disqus;