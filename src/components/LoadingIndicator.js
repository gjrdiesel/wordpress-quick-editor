import React from 'react';

export default props => props.waiting ?
    <div className="alert alert-warning" style={{position: 'absolute', top: '20vh', left: '10%'}}>
        Loading your CSV in 2.. 1..
    </div> : null