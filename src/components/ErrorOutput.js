import React from 'react';

export default props => props.errors === false ? null : <div className="panel panel-danger">
    <div className="panel-heading">
        <h3 className="panel-title">Whoops!</h3>
    </div>
    <div className="panel-body">
        <pre>{JSON.stringify(props.errors, null, 2)}</pre>
    </div>
</div>