import React from 'react';
import Styles from '../scss/SubmitComp.scss';

class SubmitComp extends React.Component {
	constructor(props){
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSubmit(){
		this.props.onSubmit();
	}

	handleCancel(){
		this.props.onCancel();
	}

	render(){
		return(
			<div style={this.props.style} className={Styles.parentCont}>
				<div className={Styles.boxCont}>
				<div>Vote for {this.props.selCate}?</div>
				<div onClick={this.handleSubmit} className={Styles.btnCont}>Submit</div>
				<div onClick={this.handleCancel} className={Styles.btnCont}>Cancel</div>
				</div>
			</div>
		);
	}
}

export default SubmitComp;