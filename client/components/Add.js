import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
var querystring = require('querystring');
class Add extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			content: '',
			author: '',
			month: '',
			year: '',
			messageFromServer: '',
			modalIsOpen: false
		}
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.insertNewArticle = this.insertNewArticle.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	openModal() {
		this.setState({
			modalIsOpen: true
		});
	}
	closeModal() {
		this.setState({
			modalIsOpen: false,
			name: '',
			content: '',
			author: '',
			month: 'Nov',
			year: 2018,
			messageFromServer: ''
		});
	}
	componentDidMount() {
		this.setState({
			month: this.props.selectedMonth
		});
		this.setState({
			year: this.props.selectedYear
		});
	}
	handleSelectChange(e) {
		if (e.target.name == 'month') {
			this.setState({
				month: e.target.value
			});
		}
		if (e.target.name == 'year') {
			this.setState({
				year: e.target.value
			});
		}
	}
	onClick(e) {
		this.insertNewArticle(this);
	}
	insertNewArticle(e) {
		axios.post('/insert',
			querystring.stringify({
				name: e.state.name,
				content: e.state.content,
				author: e.state.author,
				month: e.state.month,
				year: e.state.year
			}), {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function (response) {
				e.setState({
					messageFromServer: response.data
				});
			});
	}
	handleTextChange(e) {
		if (e.target.name == "name") {
			this.setState({
				name: e.target.value
			});
		}
		if (e.target.name == "content") {
			this.setState({
				content: e.target.value
			});
		}
		if (e.target.name == "author") {
			this.setState({
				author: e.target.value
			});
		}
	}
	render() {
		if (this.state.messageFromServer == '') {
			return (
				<div>
					<Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						contentLabel="Add Article"
						className="Modal">
						<Link to={{ pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
							<Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
						</Link><br />
						<fieldset>
							<label for="name">Name:</label>
							<input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
							<label for="content">Content:</label>
							<input type="textbox" id="content" name="content" value={this.state.content} onChange={this.handleTextChange}></input>
							<label for="author">Author:</label>
							<input type="text" id="author" name="author" value={this.state.author} onChange={this.handleTextChange}></input>
							<label for="month">Month:</label><select id="month" name="month" value={this.state.month} onChange={this.handleSelectChange}>
								<option value="Jan" id="Jan">January</option>
								<option value="Feb" id="Feb">Febrary</option>
								<option value="Mar" id="Mar">March</option>
								<option value="Apr" id="Apr">April</option>
								<option value="May" id="May">May</option>
								<option value="Jun" id="Jun">June</option>
								<option value="Jul" id="Jul">July</option>
								<option value="Aug" id="Aug">August</option>
								<option value="Sep" id="Sep">September</option>
								<option value="Oct" id="Oct">October</option>
								<option value="Nov" id="Nov">November</option>
								<option value="Dec" id="Dec">December</option>
							</select>
							<label for="year">Year:</label><select id="year" name="year" value={this.state.year} onChange={this.handleSelectChange}>
								<option value="2018" id="18">2018</option>
								<option value="2019" id="19">2019</option>
								<option value="2020" id="20">2020</option>
							</select>
						</fieldset>
						<div className='button-center'>
							<br />
							<Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Article</Button>
						</div>
					</Modal>
				</div>
			)
		}
		else {
			return (
				<div>
					<Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						contentLabel="Add Article"
						className="Modal">
						<div className='button-center'>
							<h3>{this.state.messageFromServer}</h3>
							<Link to={{ pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
								<Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
							</Link>
						</div>
					</Modal>
				</div>
			)
		}
	}
}
export default Add;