import React from 'react';


class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            gender: '',
            mobile: ''
        }
    }
    onEmailChange = (event) =>{
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }
    onFirstNameChange = (event) =>{
        this.setState({firstname: event.target.value})
    }
    onLastNameChange = (event) =>{
        this.setState({lastname: event.target.value})
    }
    onGenderChange = (event) =>{
        this.setState({gender: event.target.value})
    }
    onMobileChange = (event) =>{
        this.setState({mobile: event.target.value})
    }
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/Register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                mobile: this.state.mobile
            })
        })
        .then(response => response.json())
        .then(users => {
            if (users) {
                this.props.loadUsers(users);
                this.props.onRouteChange('home');
            }
        }) 
    }
    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"> 
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">First Name</label>
                            <input onChange={this.onFirstNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name " />
                            </div>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Last Name</label>
                            <input onChange={this.onLastNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name " />
                            </div>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Gender</label>
                            <input onChange={this.onGenderChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name " />
                            </div>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Mobile Number</label>
                            <input onChange={this.onMobileChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name " />
                            </div>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignUp;