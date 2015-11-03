THistory = React.createClass({
    render() {
        return (
    <div className="row">
        <div className="col-md-6">
            <div className="box box-bordered box-color">
                <div className="box-title">
                    <h3>Tasks you completed</h3>
                </div>
                <div className="box-content padding">
                    <ul>
                        completedTasks
                            task
                    </ul>
                    <hr/>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="box box-bordered box-color">
                <div className="box-title">
                    <h3>Tasks you planned</h3>
                </div>
                <div className="box-content padding">
                    <ul>
                        plannedTasks
                            task
                    </ul>
                    <hr/>
                </div>
            </div>
        </div>
    </div>
        );
    }
});