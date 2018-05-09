import React from 'react';

const BackDrop = props => <div {...props} style={{
    position: 'fixed',
    zIndex: 9999,
    background: 'rgba(0,0,0,.3)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
}}/>

const TogglePanePosition = props => props.left ?
    <button className="btn btn-default btn-sm"
            onClick={() => props.setLeft(false)}>
        <span className="glyphicon glyphicon-chevron-right"/> Move Pane Right
    </button> :
    <button className="btn btn-default btn-sm"
            onClick={() => props.setLeft(true)}>
        <span className="glyphicon glyphicon-chevron-left"/> Move Pane Left
    </button>

const Content = data => <div>
    <h1>ID: {data.ID} - SKU: {data.SKU}</h1>
    <div className="text-center">
        <a href={data.Images}>
            <img src={data.Images} alt="" height={200}/>
        </a>
    </div>

    <h3>Short Description <button className="btn btn-default btn-sm"
                                  onClick={() => this.setState({left: true})}>
        <span className="glyphicon glyphicon-chevron-left"/> Edit
    </button></h3>
    <div dangerouslySetInnerHTML={{__html: data['Short description']}}/>

    <h3>Description <button className="btn btn-default btn-sm"
                            onClick={() => this.setState({left: true})}>
        <span className="glyphicon glyphicon-chevron-left"/> Edit
    </button></h3>
    <div dangerouslySetInnerHTML={{__html: data.Description}}/>
</div>

const Layout = props => <div className="popover-product-info slideover">
    <div className="box">
        <div className="row">
            <div className="col-md-6">
                <TogglePanePosition
                    left={props.left}
                    setLeft={props.changePanelPosition}
                />
            </div>
            <div className="col-md-6 text-right">
                <button className="btn btn-default btn-sm" onClick={props.onClick}>
                    &times; Close
                </button>
            </div>
        </div>

        {props.children}

    </div>
</div>

export default class extends React.Component {

    state = {
        left: false
    }

    render() {
        const {data} = this.props;
        if (data == null) return null;

        return <div>
            <BackDrop {...this.props}/>
            <Layout {...this.props}
                    {...this.state}
                    changePanelPosition={(left) => this.setState({left})}>
                <Content {...data}/>
            </Layout>
        </div>
    }
}