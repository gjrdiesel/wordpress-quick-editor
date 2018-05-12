import Papa from 'papaparse'
import Static from './index'

export default {
    parserTimeout: null,
    getInput() {
        let el = document.querySelector(`#${Static.TEXTAREA_ID}`);
        return el && el.value;
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

        this.mapData(component);

    },
    mapData(component) {
        let input = this.getInput();
        let data = Papa.parse(input);
        data.headers = data.data.shift();

        data.data.map(row => {
            data.headers.forEach((key, id) => {
                let result = row[id];
                if (key === 'Categories' && result) {
                    let categories = Papa.parse(result).data[0];
                    row[key] = categories.map(cat => {
                        return Papa.parse(cat, {delimiter: '>'}).data[0].map(result => result.trim());
                    });
                } else {
                    row[key] = result;
                }
            })
            return row;
        })

        if (data.errors.length === 0) {
            component.setState({waiting: false, loaded: true, errors: false, data});
            window.localStorage && localStorage.setItem(Static.LOCALSTORAGE_KEY, JSON.stringify(component.state));
            return;
        }

        component.setState({waiting: false, loaded: false, errors: data.errors});
    }
}