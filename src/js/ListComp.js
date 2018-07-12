import React from 'react';
import Styles from '../scss/ListComp.scss';

class ListComp extends React.Component{
	constructor(props){
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(e){
		let pollId = e.currentTarget.id;
		let pollName = e.currentTarget.innerHTML;
		this.props.onSelect(pollId, pollName);
	}

	render(){
		let rendList = "No Polls Yet";
		if(this.props.pollList.length){
			rendList = this.props.pollList.map(dataObj => 
				<div className={Styles.listItem} id={dataObj.id} onClick={this.handleSelect}>{dataObj.pollName}</div>
			);
		}

		return(
			<div className={Styles.listCont} style={this.props.style}>
				{rendList}
			</div>
		);
	}
}

export default ListComp;