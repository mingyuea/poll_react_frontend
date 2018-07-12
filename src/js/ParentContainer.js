import React from 'react';
import ReactDOM from 'react-dom';
import ListComp from './ListComp';
import BarGraphComp from './BarGraphComp';
import SelectionComp from './SelectionComp';
import SubmitComp from './SubmitComp';
import PollCreateComp from './PollCreateComp';
import Styles from '../scss/ParentContainer.scss';

class ParentContainer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			initData: [],
			listStyle: {display: 'block'},
			graphStyle: {display: 'none'},
			chartTitle: "",
			currentSel: "",
			submitStyle: {display: 'none'},
			currentPollName: "",
			currentPollId: "",
			serverData: [],
			createError: "",
			createName: "",
			createCate: [],
			createStyle: {display: 'none'}
		}

		this.handleListSelect = this.handleListSelect.bind(this);
		this.handleBackToList = this.handleBackToList.bind(this);
		this.handleVoteSelect = this.handleVoteSelect.bind(this);
		this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
		this.handleVoteCancel = this.handleVoteCancel.bind(this);
		this.handleCreateInit = this.handleCreateInit.bind(this);
		this.handleCreateNameChange = this.handleCreateNameChange.bind(this);
		this.handleCreateChoiceChange = this.handleCreateChoiceChange.bind(this);
		this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
		this.handleCreateCancel = this.handleCreateCancel.bind(this);
	}

	handleListSelect(id, pollName){
		let reqUrl = 'http://localhost:5003/stored?id='+id;

		fetch(reqUrl)
		.then(res => res.json())
		.then(data => {
			this.setState({
				currentPollId: id,
				currentPollName: pollName,
				serverData: data,
				listStyle: {display: 'none'},
				graphStyle: {display: 'block'}
			});
		});
	}

	handleBackToList(){
		this.setState({
			listStyle: {display: 'block'},
			graphStyle: {display: 'none'}
		});
	}

	handleVoteSelect(id){
		let category = this.state.serverData[id].category;

		this.setState({
			currentSel: category,
			submitStyle: {display: 'block'}
		});
	}

	handleVoteSubmit(){
		this.setState({
			currentSel: "",
			submitStyle: {display: 'none'}
		});

		let voteRes = {
			'pollName': this.state.currentPollName,
			'pollId': this.state.currentPollId,
			'update': this.state.currentSel
		};

		fetch('http://localhost:5003/stored', {
			method: 'POST',
			body: JSON.stringify(voteRes),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(() => {
			return fetch('http://localhost:5003/stored?id='+voteRes.pollId)
		}
		)
		.then(res2 => res2.json())
		.then(data => {
			this.setState({
				serverData: data,
			});
		});
	}

	handleVoteCancel(){
		this.setState({
			currentSel: "",
			submitStyle: {display: 'none'}
		});	
	}

	handleCreateInit(){
		this.setState({
			createStyle: {display: 'block'}
		});
	}

	handleCreateNameChange(userIn){
		this.setState({createName: userIn});
	}

	handleCreateChoiceChange(userIn){
		this.setState({createCate: userIn});
	}

	handleCreateSubmit(){
		let delin = /\,\s|\,/g;
		let newCate = this.state.createCate.split(delin);
		let newName = this.state.createName;

		if(newName.length == 0){
			this.setState({
				createError: "Poll must have a name",
			});
		}
		else if(newCate.length < 2){
			this.setState({
				createError: "Poll must have at least 2 choices to pick from",
			});
		}
		else
		{
			let newPollObj = {
				"pollId": 0,
				"pollName": newName
			};
			let pollBody = {};

			newCate.forEach(elem => {pollBody[elem] = 0});
			newPollObj["pollBody"] = pollBody;

			fetch('http://localhost:5003/stored', {
				method: 'POST',
				body: JSON.stringify(newPollObj),
				headers: {
					'Content-Type': 'application/JSON'
				}
			})
			.then(res => res.json())
			.then(response => {if(response.insert == true){return true}})
			.then(bool => {
				return fetch('http://localhost:5003/init')
			})
			.then(res2 => res2.json())
			.then(data => this.setState({
				initData: data,
				createError: "",
				createName: "",
				createCate: "",
				createStyle: {display: 'none'}
			}));
		}
	}

	handleCreateCancel(){
		this.setState({
			createError: "",
			createName: "",
			createCate: "",
			createStyle: {display: 'none'}
		});
	}

	componentDidMount(){
		fetch('http://localhost:5003/init')
		.then(res => res.json())
		.then(data => this.setState({
			initData: data
		}));
	}

	render(){
		return (
			<div className={Styles.rootCont}>
				<div className={Styles.mainCont} style={this.state.listStyle}>
					<div className={Styles.titleCont}>List Of Polls</div>
					<ListComp style={this.state.listStyle} pollList={this.state.initData} onSelect={this.handleListSelect}/>
					<div className={Styles.createBtn} onClick={this.handleCreateInit}>Create New Poll</div>
				</div>
				<div style={this.state.createStyle} className={Styles.createCont}>
					<PollCreateComp newPollName={this.state.createName} newPollChoice={this.state.createCate} error={this.state.createError} onNameChange={this.handleCreateNameChange} onChoiceChange={this.handleCreateChoiceChange} onSubmit={this.handleCreateSubmit} onCancel={this.handleCreateCancel} />
				</div>
				<div className={Styles.secondCont} style={this.state.graphStyle}>
					<div className={Styles.backToListBtn} onClick={this.handleBackToList}> Back to Polls List </div>
					<SelectionComp onSelect={this.handleVoteSelect} pollName={this.state.currentPollName} pollData={this.state.serverData} />
					<BarGraphComp pollData={this.state.serverData} />
					<SubmitComp style={this.state.submitStyle} selCate={this.state.currentSel} onSubmit={this.handleVoteSubmit} onCancel={this.handleVoteCancel}/>
				</div>
			</div>
		);
	}

}

export default ParentContainer;

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<ParentContainer />, wrapper) : false;