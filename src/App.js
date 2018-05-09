import React, {Component} from 'react';
import CaptureCSV from './components/CaptureCSV'
import Editor from './components/Editor'
import Actions from './Actions/'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {

    state = {
        waiting: false,
        loaded: false,
        errors: false,
        confirmed: false,
        data: null,
    }

    componentWillMount() {
        Actions.loadPreviousStateFrom(this)
    }

    render() {
        return <div>
            <Editor {...this.state} />
            <CaptureCSV
                {...this.state}
                parseTimeout={event => Actions.captureCSV(this, event)}
                cancelEdit={() => Actions.editCancelled(this)}
                confirmEdit={() => Actions.editConfirmed(this)}
                loadExample={() => Actions.loadExampleData(this)}
            />
        </div>
    }
}

export default App;
