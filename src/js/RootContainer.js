import React from 'react';
import ReactDOM from 'react-dom';

class RootContainer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			"apiData": [],
			"nameIn": "",
			"quoteIn": ""
		}

		this.handleShow = this.handleShow.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleQuoteChange = this.handleQuoteChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		fetch('http://localhost:5003/stored')
		.then(res => res.json())
		.then(data => this.setState({
			"apiData": data
		}));
	}

	handleShow(e){
		e.preventDefault();
		console.log(this.state.apiData);
	}

	handleNameChange(e){
		let nameIn = e.target.value;
		this.setState({
			"nameIn": nameIn
		});
	}

	handleQuoteChange(e){
		let quoteIn = e.target.value;
		this.setState({
			"quoteIn": quoteIn
		});
	}

	handleSubmit(e){
		e.preventDefault();
		let databody = {
			"name": this.state.nameIn,
			"quote": this.state.quoteIn
		}

		return fetch('http://localhost:5003/stored', {
			method: 'POST',
			body: JSON.stringify(databody),
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}


	render(){
		let rendArr = "rendering";
		if(this.state.apiData.length > 0){
			rendArr = this.state.apiData.map((obj) => JSON.stringify(obj));
		}
		return (
			<div>
				<div>{rendArr}</div>
				<button onClick={this.handleShow}>Show State</button>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name
						<input type="text" name="name" value={this.nameIn} onChange={this.handleNameChange}/>
					</label>
					<label>
						quote
						<input type="text" name="quote" value={this.quoteIn} onChange={this.handleQuoteChange}/>
					</label>
					<input type="submit" value="Add to DB" />
				</form> 
			</div>
		);
	}
}

export default RootContainer;

const myApp = document.getElementById('app');

myApp ? ReactDOM.render(<RootContainer />, myApp) : false;