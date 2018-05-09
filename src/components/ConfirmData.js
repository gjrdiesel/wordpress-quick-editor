import React from 'react';

export default ({data, confirmEdit, cancelEdit}) => <div className="container" style={{marginTop: '10vh'}}>
    <div className="panel panel-success">
        <div className="panel-heading">
            <h3 className="panel-title">
                Does this CSV data look right?
            </h3>
        </div>
        <div className="panel-body">
            <pre>{JSON.stringify([data[0], data[1]], null, 2)}</pre>
            <button className="btn btn-success"
                    style={{marginRight: 20}}
                    onClick={confirmEdit}>Yep, let's edit
            </button>
            <button className="btn btn-default"
                    onClick={cancelEdit}>Cancel
            </button>
        </div>
    </div>
</div>