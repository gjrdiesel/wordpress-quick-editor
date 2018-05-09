import Papa from 'papaparse'
import Static from './index'

export default {
    parserTimeout: null,
    getInput() {
        return document.querySelector(`#${Static.TEXTAREA_ID}`).value;
    },
    clearPreviousDelay() {
        clearTimeout(this.parserTimeout);
    },
    triggerTimeoutDelay(component) {

        this.clearPreviousDelay();

        component.setState({
            waiting: true,
            errors: false,
            loaded: false,
            data: null,
        }, () => this.parserTimeout = setTimeout(() => this.csvToState(component), 2000));
    },
    inputIsBlank(component) {
        let value = this.getInput();

        if (!value || value.length < 10) {
            this.resetComponentToWaiting(component);
            return true;
        }

        return false;
    },
    resetComponentToWaiting(component) {
        this.clearPreviousDelay();
        component.setState({waiting: false, loaded: false, errors: false});
    },
    captureCSV(component, event) {

        if (event.key !== 'v' && event.key !== 'Meta' && event.key !== 'Enter') {
            return;
        }

        this.triggerTimeoutDelay(component);

    },
    csvToState(component) {

        if (this.inputIsBlank(component)) {
            return;
        }

        let data = Papa.parse(this.getInput());
        data.headers = data.data.shift();

        if (data.errors.length === 0) {
            component.setState({waiting: false, loaded: true, errors: false, data});
            localStorage.setItem(Static.LOCALSTORAGE_KEY, JSON.stringify(component.state));
            return;
        }

        component.setState({waiting: false, loaded: false, errors: data.errors});
    }
}