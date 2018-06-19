import React from 'react';
import Styles from '../scss/BarGraphComp.scss';

class BarGraphComp extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let barArr = "Nothing here yet";
		let cateArr = "No choices yet";
		let percentArr = "Empty";
		let dataCount = this.props.pollData.length;

		if(dataCount > 0){
			let spacing = Math.floor(90 / dataCount);
			barArr = this.props.pollData.map((dataObj, ind) => 
				<div style={{height: dataObj.percentage, left: (5 + spacing * ind)+'%'}} className={Styles.myBar}></div>
			);

			cateArr = this.props.pollData.map((dataObj, ind) => 
				<div style={{left: (5 + spacing * ind)+'%'}} className={Styles.myCate}>{dataObj.category}</div>
			);

			percentArr = this.props.pollData.map((dataObj, ind) => 
				<div style={{left: (5 + spacing * ind)+'%', bottom: dataObj.percentage}} className={Styles.percentDisp}>{dataObj.percentage}</div>
			);
		}

		return(
			<div className={Styles.graphCont}>
				<div className={Styles.bufferCont}></div>
				<div className={Styles.barCont}>
					{percentArr}
					{barArr}
				</div>
				<div className={Styles.cateCont}>
					{cateArr}
				</div>
			</div>
		);
	}
}

export default BarGraphComp;