TAnnouncement = React.createClass({
	render() {
		return (
	<div>
    <div className="row">
        <div className="col-md-6 center">
            <div className="box box-bordered box-color">
                <div className="box-title">
                    <h3>We are excited to announce <span className="brand">lockstep.net</span>!</h3>
                </div>
                <div className="box-content padding">


                    <div className="visible-xs visible-sm braggaListPhone align-center">
                        <p><strong>Achieve more</strong></p>

                        <p>and</p>

                        <p><strong>Have fun</strong></p>

                        <p><strong>Meet new people</strong></p>

                        <p><strong>Improve your concentration</strong></p>

                        <p><strong>Save time</strong></p>

                        <p>...while doing so</p>
                    </div>

                    <div className="braggaList visible-md visible-lg welcome">
                        <ul className="fa-ul braggaList">
                            <li><i className="fa fa-li fa-check"></i>
                                Achieve more
                            </li>
                        </ul>
                        <p className="align-center">and</p>
                        <ul className="fa-ul braggaList">
                            <li>
                                <i className="fa fa-li fa-check"></i>
                                Have fun
                            </li>
                            <li>
                                <i className="fa fa-li fa-check"></i>
                                Meet new people
                            </li>
                            <li>
                                <i className="fa fa-li fa-check"></i>
                                Improve your concentration
                            </li>
                            <li>
                                <i className="fa fa-li fa-check"></i>
                                Save time
                            </li>
                        </ul>
                        <p className="align-center">... while doing so</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-6 center">
            <div className="box box-bordered box-color">
                <div className="box-content padding welcome">
                    <p className="align-center">Open (very) Early Beta starting October 11 2015.</p>
                    <p className="align-center">Feedback appreciated! Please send email with questions to lgandecki AT
                        thebrain PRO </p>
                </div>
            </div>
        </div>
    </div>
    </div>
		);
	}
});