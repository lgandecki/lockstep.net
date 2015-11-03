TLayout = React.createClass({
    render() {
        return (
    <div className="container-fluid">
        <div id="wrapper">
            <THeader />

            <div id="main">
                <div className="container">
                    {this.props.content}
                </div>
            </div>
        </div>
        <div id="footer">

        </div>
    </div>            
        );
    }

});
