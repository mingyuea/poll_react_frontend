import React from 'react';
import Styles from '../scss/SelectionComp.scss';

class SelectionComp extends React.Component {
	constructor(props){
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(e){
		let id = e.currentTarget.id;

		this.props.onSelect(id);
	}

	render(){
		let rendArr = "No choices yet";
		let pollData = this.props.pollData;
		if(pollData.length > 0){
			rendArr = pollData.map( (dataObj, ind) => 
				<div id={ind} onClick={this.handleSelect} className={Styles.buttonDiv}>{dataObj.category}</div>
			);
		}
		return(
			<div className={Styles.selCont}>
				<h4>{this.props.pollName}</h4>
				<h6>Vote:</h6>
				<div className={Styles.buttonCont}>
					{rendArr}
				</div>
			</div>
		);
	}
}

export default SelectionComp;