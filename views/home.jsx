var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var browserHistory = window.ReactRouter.browserHistory;
var Link = window.ReactRouter.Link;

class AddPost extends React.Component {
	constructor(props) {
		super(props);
		this.addPost = this.addPost.bind(this);
		this.getCategories = this.getCategories.bind(this);
		this.getPostWithId = this.getPostWithId.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.state = {
			title: '',
			content: '',
			email: '',
			categories: [],
			id: ''
		};
	}
	componentDidMount() {
		document.getElementById('homeHyperlink').className = '';
		document.getElementById('addHyperLink').className = 'active';
		document.getElementById('myPostsHyperLink').className = '';
		document.getElementById('categoryHyperlink').className = '';
		document.getElementById('profileHyperlink').className = '';
		document.getElementById('logoutHyperlink').className = '';
		this.getProfile();
		this.getPostWithId();
		this.getCategories();
	}
	getProfile() {
		var self = this;
		axios
			.post('/getProfile', {})
			.then(function(response) {
				if (response) {
					self.setState({ email: response.data.email });
				}
			})
			.catch(function(error) {
				console.log('Error is ', error);
			});
	}
	getCategories() {
		var self = this;
		axios
			.post('/getCategory', {})
			.then(function(response) {
				if (response) {
					self.setState({ categories: response.data });
				}
			})
			.catch(function(error) {
				console.log('Error is ', error);
			});
	}
	addPost() {
		axios
			.post('/addPost', {
				title: this.state.title,
				content: this.state.content,
				email: this.state.email,
				category: this.state.category,
				id: this.props.params.id
			})
			.then(function(response) {
				console.log('Response from add post is ', response);
				hashHistory.push('/');
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	getPostWithId() {
		var id = this.props.params.id;
		var self = this;
		axios
			.post('/getPostWithId', {
				id: id
			})
			.then(function(response) {
				if (response) {
					self.setState({ title: response.data.title });
					self.setState({
						content: response.data.content
					});
					self.setState({
						category: response.data.category
					});
				}
			})
			.catch(function(error) {
				console.log('error is ', error);
			});
	}
	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}
	handleContentChange(e) {
		this.setState({ content: e.target.value });
	}
	handleCategoryChange(e) {
		this.setState({ category: e.target.value });
	}
	render() {
		return (
			<div className='col-md-5'>
				<div className='form-area'>
					<form role='form'>
						<br styles='clear:both' />
						<div className='form-group'>
							<input
								value={this.state.title}
								type='text'
								onChange={this.handleTitleChange}
								className='form-control'
								id='title'
								name='title'
								placeholder='Title'
								required
							/>
						</div>
						<div className='form-group'>
							<textarea
								value={this.state.content}
								className='form-control'
								onChange={this.handleContentChange}
								type='textarea'
								id='content'
								placeholder='Content'
								maxlength='140'
								rows='7'
							/>
						</div>
						<div className='form-group'>
							<label for='sel1'>Select Category:</label>
							<select
								className='form-control'
								value={this.state.category}
								onChange={this.handleCategoryChange}>
								<option value='0'>Select Category</option>
								{this.state.categories.map(
									function(category, i) {
										return (
											<option
												key={i}
												value={category._id}>
												{category.name}
											</option>
										);
									}.bind(this)
								)}
							</select>
						</div>
						<button
							type='button'
							onClick={this.addPost}
							id='submit'
							name='submit'
							className='btn btn-primary pull-right'>
							Add Post
						</button>
					</form>
				</div>
			</div>
		);
	}
}

class AddCategory extends React.Component {
	constructor(props) {
		super(props);
		this.addCategory = this.addCategory.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.state = {
			category: ''
		};
	}
	componentDidMount() {
		document.getElementById('homeHyperlink').className = '';
		document.getElementById('addHyperLink').className = '';
		document.getElementById('myPostsHyperLink').className = '';
		document.getElementById('categoryHyperlink').className = 'active';
		document.getElementById('profileHyperlink').className = '';
		document.getElementById('logoutHyperlink').className = '';
	}
	handleCategoryChange(e) {
		this.setState({ category: e.target.value });
	}
	addCategory() {
		axios
			.post('/addCategory', {
				category: this.state.category
			})
			.then(function(response) {
				console.log('reponse from add category is ', response);
				hashHistory.push('/');
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	render() {
		return (
			<div className='col-md-5'>
				<div className='form-area'>
					<form role='form'>
						<br styles='clear:both' />
						<div className='form-group'>
							<input
								value={this.state.category}
								type='text'
								onChange={this.handleCategoryChange}
								className='form-control'
								id='category'
								name='category'
								placeholder='Category'
								required
							/>
						</div>
						<div className='form-group'>
							<button
								type='button'
								onClick={this.addCategory}
								id='submit'
								name='submit'
								className='btn btn-primary pull-right'>
								Add Category
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

class ShowProfile extends React.Component {
	constructor(props) {
		super(props);
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleMobileChange = this.handleMobileChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.getProfile = this.getProfile.bind(this);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			mobile: '',
			password: ''
		};
	}
	componentDidMount() {
		document.getElementById('homeHyperlink').className = '';
		document.getElementById('addHyperLink').className = '';
		document.getElementById('myPostsHyperLink').className = '';
		document.getElementById('categoryHyperlink').className = '';
		document.getElementById('profileHyperlink').className = 'active';
		document.getElementById('logoutHyperlink').className = '';
		this.getProfile();
	}
	updateProfile() {
		var self = this;
		axios
			.post('/updateProfile', {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				mobile: this.state.mobile,
				password: this.state.password
			})
			.then(function(response) {
				if (response) {
					hashHistory.push('/');
				}
			})
			.catch(function(error) {
				console.log('error is ', error);
			});
	}
	handleFirstNameChange(e) {
		this.setState({ firstname: e.target.value });
	}
	handleLastNameChange(e) {
		this.setState({ lastname: e.target.value });
	}
	handleMobileChange(e) {
		this.setState({ mobile: e.target.value });
	}
	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}
	getProfile() {
		var self = this;
		axios
			.post('/getProfile', {})
			.then(function(response) {
				if (response) {
					self.setState({ firstname: response.data.firstname });
					self.setState({ lastname: response.data.lastname });
					self.setState({ email: response.data.email });
					self.setState({ mobile: response.data.mobile });
					self.setState({ password: response.data.password });
				}
			})
			.catch(function(error) {
				console.log('error is ', error);
			});
	}
	render() {
		return (
			<div className='col-md-5'>
				<div className='form-area'>
					<form role='form'>
						<br styles='clear:both' />
						<div className='form-group'>
							<input
								value={this.state.firstname}
								type='text'
								onChange={this.handleFirstNameChange}
								className='form-control'
								placeholder='First Name'
								required
							/>
						</div>
						<div className='form-group'>
							<input
								value={this.state.lastname}
								type='text'
								onChange={this.handleLastNameChange}
								className='form-control'
								placeholder='Last Name'
								required
							/>
						</div>
						<div className='form-group'>
							<input
								value={this.state.email}
								type='text'
								className='form-control'
								placeholder='Email'
								disabled='true'
							/>
						</div>
						<div className='form-group'>
							<input
								value={this.state.mobile}
								type='text'
								onChange={this.handleMobileChange}
								className='form-control'
								placeholder='Mobile'
								required
							/>
						</div>
						<div className='form-group'>
							<input
								value={this.state.password}
								type='password'
								onChange={this.handlePasswordChange}
								className='form-control'
								placeholder='Password'
								required
							/>
						</div>
						<button
							type='button'
							onClick={this.updateProfile}
							id='submit'
							name='submit'
							className='btn btn-primary pull-right'>
							Update
						</button>
					</form>
				</div>
			</div>
		);
	}
}

class ShowPost extends React.Component {
	constructor(props) {
		super(props);
		this.updatePost = this.updatePost.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.getPost = this.getPost.bind(this);
		this.state = {
			posts: []
		};
	}
	updatePost(id) {
		hashHistory.push('/addPost/' + id);
	}
	deletePost(id) {
		if (confirm('Are you sure ?')) {
			var self = this;
			axios
				.post('/deletePost', {
					id: id
				})
				.then(function(response) {
					self.getPost();
				})
				.catch(function(error) {
					console.log('Error is ', error);
				});
		}
	}
	getPost() {
		var self = this;
		axios
			.post('/getPost', {})
			.then(function(response) {
				self.setState({ posts: response.data });
			})
			.catch(function(error) {
				console.log('error is ', error);
			});
	}
	componentDidMount() {
		this.getPost();
		document.getElementById('homeHyperlink').className = '';
		document.getElementById('addHyperLink').className = '';
		document.getElementById('myPostsHyperLink').className = 'active';
		document.getElementById('categoryHyperlink').className = '';
		document.getElementById('profileHyperlink').className = '';
		document.getElementById('logoutHyperlink').className = '';
	}
	render() {
		return (
			<div className='tableSize'>
				<style>
					{
						'table {border-collapse:collapse; table-layout:fixed;}; table td {border:solid 1px #fab; max-width:5px; word-wrap:normal;} }'
					}
				</style>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Content</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{this.state.posts.map(
							function(post, index) {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{post.title}</td>
										<td>{post.content}</td>
										<td>
											<span
												onClick={this.updatePost.bind(
													this,
													post._id
												)}
												className='glyphicon glyphicon-pencil'
											/>
										</td>
										<td>
											<span
												onClick={this.deletePost.bind(
													this,
													post._id
												)}
												className='glyphicon glyphicon-remove'
											/>
										</td>
									</tr>
								);
							}.bind(this)
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

class ShowPostAll extends React.Component {
	constructor(props) {
		super(props);
		this.getPostAll = this.getPostAll.bind(this);
		this.state = {
			postsAll: []
		};
	}
	getPostAll() {
		var self = this;
		axios
			.post('/getPostAll', {})
			.then(function(response) {
				self.setState({ postsAll: response.data });
			})
			.catch(function(error) {
				console.log('error is ', error);
			});
	}
	componentDidMount() {
		this.getPostAll();
		document.getElementById('homeHyperlink').className = 'active';
		document.getElementById('addHyperLink').className = '';
		document.getElementById('myPostsHyperLink').className = '';
		document.getElementById('categoryHyperlink').className = '';
		document.getElementById('profileHyperlink').className = '';
		document.getElementById('logoutHyperlink').className = '';
	}
	render() {
		return (
			<div className='tableSize'>
				<style>
					{
						'table {border-collapse:collapse; table-layout:fixed;}; table td {border:solid 1px #fab; max-width:5px; word-wrap:normal;} }'
					}
				</style>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Content</th>
						</tr>
					</thead>
					<tbody>
						{this.state.postsAll.map(
							function(post, index) {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{post.title}</td>
										<td>{post.content}</td>
									</tr>
								);
							}.bind(this)
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

class Logout extends React.Component {
	constructor(props) {
		super(props);
		this.signIn = this.signIn.bind(this);
	}
	componentDidMount() {
		document.getElementById('homeHyperlink').className = '';
		document.getElementById('addHyperLink').className = '';
		document.getElementById('myPostsHyperLink').className = '';
		document.getElementById('categoryHyperlink').className = '';
		document.getElementById('profileHyperlink').className = '';
		document.getElementById('logoutHyperlink').className = 'active';
	}
	signIn() {
		window.location.assign('/');
	}
	render() {
		return (
			<div>
				<form className='form-signin'>
					<button
						className='btn btn-lg btn-primary'
						onClick={this.signIn}
						type='button'>
						Click here to log out
					</button>
				</form>
			</div>
		);
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route component={ShowPostAll} path='/' />
		<Route component={ShowPost} path='/myPosts' />
		<Route component={AddPost} path='/addPost(/:id)' />
		<Route component={AddCategory} path='/addCategory' />
		<Route component={ShowProfile} path='/showProfile' />
		<Route component={Logout} path='/logout' />
	</Router>,
	document.getElementById('app')
);
