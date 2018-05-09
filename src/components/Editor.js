import React from 'react';
import Papa from "papaparse";
import ProductPopover from './ProductPopover'

function strip(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

export default class extends React.Component {

    constructor(props) {
        super(props);

        let headers = props.data.shift();
        let data = props.data.map(row => {
            headers.forEach((key, num) => {
                row[key] = row[num];

                if (key === 'Images') {
                    row[num] = <img src={row[num]} height={40}/>;
                } else {
                    row[num] = strip(row[num]).substring(0, 80);
                }

            });

            return row;
        });

        this.state = {
            headers, data, highlight: null
        }
    }

    closePopover = () => {
        this.setState({highlight: null});
    }

    handleRowClick = row => {
        if (this.state.highlight === row) {
            this.closePopover();
        } else {
            this.setState({highlight: row});
        }
    }

    renderTable = row => <tr onClick={() => this.handleRowClick(row)}>
        {row.map(td => <td>{td}</td>)}
    </tr>;

    render() {
        let {confirmed} = this.props;
        if (!confirmed) return null;

        let {data, headers, highlight} = this.state;

        return <div className="container-fluid">
            <ProductPopover data={highlight} onClick={this.closePopover}/>
            <div className="row">
                <div className="col-md-8">
                    <a href="">+ Add Product</a> / <a href="">Download <code>.csv</code></a>
                </div>
                <div className="col-md-4">
                    <input className="form-control" placeholder="Search..."/>
                </div>
            </div>
            <br/>
            <table className="table table-bordered table-hover table-striped">
                <thead>
                <tr>
                    {headers.map(th => <th>{th}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.map(this.renderTable)}
                </tbody>
            </table>
        </div>
    }
}