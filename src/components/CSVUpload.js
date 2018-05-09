import React from 'react';

export default props => <textarea
    id="csv_payload"
    rows={20}
    className="form-control"
    placeholder="Paste your CSV here..."
    onKeyDown={props.parseTimeout}
/>