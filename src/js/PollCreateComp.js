import React from 'react';
import Styles from '../scss/PollCreateComp.scss';

class PollCreateComp extends React.Component {
	constructor(props){
		super(props);

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleChoiceChange = this.handleChoiceChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleNameChange(e){
		let newVal = e.target.value;
		this.props.onNameChange(newVal);
	}

	handleChoiceChange(e){
		let newVal = e.target.value;
		this.props.onChoiceChange(newVal);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSubmit();
	}

	handleCancel(e){
		e.preventDefault();
		this.props.onCancel();
	}

	render(){
		let errorMsg = "";
		if(this.props.error.length > 0){
			errorMsg = <label className={Styles.errorMsg}>{this.props.error}</label>;
		}
		return(
			<div className={Styles.formCont}>
			<form onSubmit={this.handleSubmit}>
				<label>
					<div className={Styles.formElemCont}>Poll Name: </div>
					<input type="text" value={this.props.newPollName} onChange={this.handleNameChange} />
				</label>
				<label>
					<div className={Styles.formElemCont}>Enter in choices (seperated by commas):</div>
					<input type="text" value={this.props.newPollChoice} onChange={this.handleChoiceChange} />
				</label>
				{errorMsg}
				<div className={Styles.btnCont}>
					<input type="submit" value="Submit"/>
					<button onClick={this.handleCancel}>Cancel</button>
				</div>
			</form>
			</div>
		);
	}
}

export default PollCreateComp;