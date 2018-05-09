import Parser from './Parser'
import Actions from './Actions'

export default {
    TEXTAREA_ID: 'csv_payload',
    LOCALSTORAGE_KEY: 'previous_entry',
    ...Parser,
    ...Actions
}