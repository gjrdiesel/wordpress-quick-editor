import Papa from 'papaparse'
import Static from './index'

export default {
    parserTimeout: null,
    captureCSV(component) {
        clearTimeout(this.parserTimeout);
        component.setState({
            waiting: true,
            errors: false,
            loaded: false,
            data: null,
        }, () => this.parserTimeout = setTimeout(() => this.csvToState(component), 2000));
    },
    csvToState(component) {
        let result = Papa.parse(
            document.querySelector(`#${Static.TEXTAREA_ID}`).value
        );

        if (result.errors.length === 0) {
            component.setState({waiting: false, loaded: true, errors: false, data: result.data});
            localStorage.setItem(Static.LOCALSTORAGE_KEY, JSON.stringify(component.state));
            return;
        }

        component.setState({waiting: false, loaded: false, errors: result.errors});
    }
}