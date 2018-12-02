var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var Link = window.ReactRouter.Link;

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.state = {
			email: '',
			password: ''
		};
	}
	signIn() {
		axios.post('/signin', {
			email: this.state.email,
			password: this.state.password,

		})
			.then(function (response) {
				if (response.data == 'success') {
					window.location.assign('http://localhost:7777/home')
				}
			})
			.catch(function (error) {
				console.log(error);
			});

	}
	handleEmailChange(e) {
		this.setState({ email: e.target.value })
	}
	handlePasswordChange(e) {
		this.setState({ password: e.target.value })
	}
	render() {
		return (
			<div>
				<style>{'body { background:linear-gradient(to right,rgb(224,156,197),rgb(68,166,187)); }'}</style>
				<form className="form-signin">
					<h2 className="form-signin-heading">Please sign in</h2>
					<label for="inputEmail" className="sr-only">Email address</label>
					<input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" autocomplete="email" required autofocus /><br />
					<label for="inputPassword" className="sr-only">Password</label>
					<input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" autocomplete="current-password" required /><br />
					<button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button">Sign in</button>
				</form>
				<div>
					<Link to="/signup">{'Signup'}</Link>
				</div>
			</div>
		)
	}
}

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.signUp = this.signUp.bind(this);
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleMobileChange = this.handleMobileChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlePassword2Change = this.handlePassword2Change.bind(this);
		this.state = {
			firstname: '',
			lastname: '',
			gender: '',
			email: '',
			mobile: '',
			password: '',
			password2: ''
		};
	}
	handleFirstNameChange(e) {
		this.setState({ firstname: e.target.value })
	}
	handleLastNameChange(e) {
		this.setState({ lastname: e.target.value })
	}
	handleGenderChange(e) {
		this.setState({ gender: e.target.value })
	}
	handleEmailChange(e) {
		this.setState({ email: e.target.value })
	}
	handleMobileChange(e) {
		this.setState({ mobile: e.target.value })
	}
	handlePasswordChange(e) {
		this.setState({ password: e.target.value })
	}
	handlePassword2Change(e) {
		this.setState({ password2: e.target.value })
	}
	userExist() {
		axios.post('/checkEmail', {
			email: this.state.email
		})
			.then(function (response) {
				if (response.data == 'success') {
					alert('User already exists.');
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	signUp() {
		if (!this.state.firstname) {
			alert('First name cannot be empty.');
		}
		else if (typeof this.state.firstname !== "undefined") {
			if (!this.state.firstname.match(/^[a-zA-Z]+$/)) {
				alert('First name can contain only letters.');
			}
			else if (!this.state.lastname) {
				alert('Last name cannot be empty.');
			}
			else if (typeof this.state.lastname !== "undefined") {
				if (!this.state.lastname.match(/^[a-zA-Z]+$/)) {
					alert('Last name can contain only letters.');
				}
				else if (!this.state.gender) {
					alert('Gender cannot be empty.');
				}
				else if (typeof this.state.email !== "undefined") {
					let lastAtPos = this.state.email.lastIndexOf('@');
					let lastDotPos = this.state.email.lastIndexOf('.');
					if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
						alert("Email is invalid.");
					}
					else if (!this.state.mobile) {
						alert('Mobile cannot be empty.');
					}
					else if (!this.state.password) {
						alert('Password cannot be empty.');
					}
					else if (!this.state.password2) {
						alert('Confirm password cannot be empty.');
					}
					else if (this.state.password === this.state.password2) {
						axios.post('/signup', {
							firstname: this.state.firstname,
							lastname: this.state.lastname,
							gender: this.state.gender,
							email: this.state.email,
							mobile: this.state.mobile,
							password: this.state.password,
							password2: this.state.password2
						})
							.then(function (response) {
								if (response.data == 'success') {
									window.location.assign('http://localhost:7777/')
								}
							})
							.catch(function (error) {
								console.log(error);
							});
					} else {
						alert("Passwords don't match");
					}
				}
			}
		}
	}
	render() {
		return (
			<div>
				<style>
					{'body { background:linear-gradient(to right,rgb(224,156,197),rgb(68,166,187)); }'}
				</style>
				<form className="form-signin">
					<h2 className="form-signin-heading">Please sign up</h2>
					<label for="inputFirstName" className="sr-only">First Name</label>
					<input type="name" onChange={this.handleFirstNameChange} id="inputFirstName" className="form-control" placeholder="First Name" autocomplete="fname" required autofocus /><br />
					<label for="inputLastName" className="sr-only">Last Name</label>
					<input type="name" onChange={this.handleLastNameChange} id="inputLastName" className="form-control" placeholder="Last Name" autocomplete="lname" required /><br />
					<label for="inputGender" className="sr-only">Gender:</label>
					<select id="inputGender" onChange={this.handleGenderChange} name="year" className="form-control" placeholder="Gender" autocomplete="sex" required>
						<option>Gender</option>
						<option value="Male" id="Male">Male</option>
						<option value="Female" id="Female">Female</option>
					</select><br />
					<label for="inputEmail" className="sr-only">Email address</label>
					<input type="email" onBlur={this.userExist} onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" autocomplete="email" required /><br />
					<label for="inputMobile" className="sr-only">Mobile</label>
					<input type="mobile" onChange={this.handleMobileChange} id="inputMobile" className="form-control" placeholder="Mobile" autocomplete="tel" required /><br />
					<label for="inputPassword" className="sr-only">Password</label>
					<input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" autocomplete="new-password" required /><br />
					<label for="inputPassword2" className="sr-only">Confirm Password</label>
					<input type="password" onChange={this.handlePassword2Change} id="inputPassword2" className="form-control" placeholder="Confirm Password" autocomplete="off" required /><br />
					<button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button">Sign up</button>
				</form>
				<div>
					<Link to="/">{'Signin'}</Link>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route component={Signin} path="/"></Route>
		<Route component={Signup} path="/signup"></Route>
	</Router>,
	document.getElementById('app'));