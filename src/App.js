import React, {Component} from 'react';
import './App.css';
import CaptureCSV from './components/CaptureCSV'
import Editor from './components/Editor'
import Actions from './Actions/'

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
                parseTimeout={() => Actions.captureCSV(this)}
                cancelEdit={() => Actions.editCancelled(this)}
                confirmEdit={() => Actions.editConfirmed(this)}
                loadExample={() => Actions.loadExampleData(this)}
            />
        </div>
    }
}

export default App;
