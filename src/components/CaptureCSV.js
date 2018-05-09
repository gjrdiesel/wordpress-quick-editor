import React from 'react';
import CSVUpload from './CSVUpload'
import ConfirmData from './ConfirmData'
import ErrorOutput from './ErrorOutput'
import LoadingIndicator from './LoadingIndicator'
import JumbotronExplainer from './JumbotronExplainer'

const WaitForData = props => <div>
    <div className="container">
        <JumbotronExplainer {...props} />
        <LoadingIndicator {...props}/>
        <ErrorOutput {...props} />
        <CSVUpload {...props}/>
    </div>
</div>

export default props => {
    if (props.confirmed === true) {
        // we don't need to wait or confirm data, return blank
        return null;
    }

    let csvNotLoaded = props.loaded === false && props.confirmed === false;
    if (csvNotLoaded) {
        return <WaitForData {...props}/>;
    }

    return <ConfirmData {...props}/>;
}