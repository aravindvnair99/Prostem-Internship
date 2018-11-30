import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add'
export default class App extends React.Component {
	constructor() {
		super();
		this.state = { selectedMonth: 'Nov', selectedYear: 2018, data: [] };
		this.getData = this.getData.bind(this);
	}
	componentDidMount() {
		this.getData(this, '2018');
	}
	componentWillReceiveProps(nextProps) {
		this.getData(this, '2018');
	}
	getData(ev, year) {
		axios.get('/getAll?month=All&year=' + year)
			.then(function (response) {
				ev.setState({ data: response.data });
				ev.setState({ selectedYear: parseInt(year) })
			});
	}
	render() {
		return (
			<div>
				<Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
				<table>
					<thead>
						<tr><th></th><th className='desc-col'>Name</th><th className='button-col'>Content</th><th className='button-col'>Author</th><th className='button-col'>Month</th><th className='button-col'>Year</th></tr>
					</thead>
					<tbody>
						{
							this.state.data.map(function (exp) {
								return <tr><td className='counterCell'></td><td className='desc-col'>{exp.name}</td><td className='button-col'>{exp.content}</td><td className='button-col'>{exp.author}</td><td className='button-col'>{exp.month}</td><td className='button-col'>{exp.year}</td></tr>
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}