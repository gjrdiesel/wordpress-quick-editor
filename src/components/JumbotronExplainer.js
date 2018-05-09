import React from 'react';

export default props => <div className="jumbotron">
    <div className="container">
        <h1>WordPress Quick Editor</h1>
        <p>Upload a <code>.CSV</code> with <kbd>ID, SKU, Short Description, Description, Categories,
            Images</kbd> and then quickly edit all those items in this easy editor.</p>
        <p>
            <button className="btn btn-primary btn-lg" onClick={props.loadExample}>Show me an example .CSV</button>
        </p>
    </div>
</div>