import Static from './index'
import Parser from './Parser'
import exampleCSV from '../example.csv'

export default {
    editCancelled(component) {
        component.setState({confirmed: false, loaded: false})
        localStorage.clear();
    },
    editConfirmed(component) {
        component.setState({confirmed: true})
    },
    loadExampleData(fromApp) {
        fetch(exampleCSV)
            .then(res => res.text())
            .then(text => {
                document.querySelector(`#${Static.TEXTAREA_ID}`).value = text
                Parser.csvToState(fromApp);
            })
            .catch(errors => fromApp.setState({errors}))
    },
    loadPreviousStateFrom(component) {

        return; // this requires more thought

        let previousState = localStorage.getItem(Static.LOCALSTORAGE_KEY);
        if (!previousState) {
            return;
        }

        try {
            previousState = JSON.parse(previousState)
        } catch (exception) {
            previousState = null;
        }

        component.setState(previousState);
    }
}