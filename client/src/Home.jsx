import React, { Component } from 'react';
import axios from 'axios';
//import assets

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login_username: '',
      login_password: '',
      register_username: '',
      register_password: '',
      lat: 43.65,
      lng: -79.391
    };
    this.getLocation();
  }

  submitLogin = event => {
    event.preventDefault();

    // stops submit if either username or password is blank
    if (!this.state.login_username || !this.state.login_password) {
      alert('Username or Password is Blank!');
      return;
    }

    const reqObj = {
      username: this.state.login_username,
      password: this.state.login_password
    };

    axios
      .post('http://localhost:8080/user/login', reqObj)
      .then(res => {
        //grabs the userId from the successful login response
        let userId = { userId: res.data.data.attributes.id };
        this.props.setUserId(userId);
        sessionStorage.setItem('userId', res.data.data.attributes.id);
        sessionStorage.setItem('username', res.data.data.attributes.username);
        sessionStorage.setItem('lat', res.data.data.attributes.lat);
        sessionStorage.setItem('lng', res.data.data.attributes.lng);
        this.props.history.push('/adopt');
      })
      .catch(err => alert(err));
  };

  // controlled input for username
  handleChangeLoginUsername = event => {
    this.setState({
      login_username: event.target.value.trim()
    });
  };

  // controlled input for password
  handleChangeLoginPassword = event => {
    this.setState({
      login_password: event.target.value.trim()
    });
  };

  // function call to grab the gps locations of the user
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLocation);
    }
  };

  // function call to set the current state to the current location
  setLocation = position => {
    this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
  };

  submitRegister = event => {
    event.preventDefault();

    // stops submit if either username or password is blank
    if (!this.state.register_username || !this.state.register_password) {
      alert('Username or Password is Blank!');
      return;
    }

    const reqObj = {
      username: this.state.register_username,
      password: this.state.register_password,
      lat: this.state.lat,
      lng: this.state.lng,
      adopted: false
    };

    axios
      .post('http://localhost:8080/user/register', reqObj)
      .then(res => {
        //grabs the userId from the successful login response
        let userId = { userId: res.data.data.attributes.id };
        this.props.setUserId(userId);
        sessionStorage.setItem('userId', res.data.data.attributes.id);
        sessionStorage.setItem('username', res.data.data.attributes.username);
        sessionStorage.setItem('lat', res.data.data.attributes.lat);
        sessionStorage.setItem('lng', res.data.data.attributes.lng);
        this.props.history.push('/adopt');
      })
      .catch(err => alert(err));
  };

  // controlled input for username
  handleChangeRegisterUsername = event => {
    this.setState({
      register_username: event.target.value.trim()
    });
  };

  // controlled input for password
  handleChangeRegisterPassword = event => {
    this.setState({
      register_password: event.target.value.trim()
    });
  };

  render() {
    return (
      <React.Fragment>
        <video id="home-video-background" loop autoPlay>
          <source src={require('./assets/bg.mp4')} type="video/mp4" />
        </video>

        <section id="home-panel" className="panel panel-default">
          <img src={require('./assets/moe_00.png')} alt="notWorking" id="mouseUI" />

          <p>login</p>
          <form onSubmit={this.submitLogin}>
            <label>
              username:
              <input name="username" type="text" onChange={this.handleChangeLoginUsername} />
            </label>
            <label>
              password:
              <input name="password" type="password" onChange={this.handleChangeLoginPassword} />
            </label>

            <input type="submit" value="Submit" />
          </form>

          <p>register</p>
          <form onSubmit={this.submitRegister}>
            <label>
              username:
              <input name="username" type="text" onChange={this.handleChangeRegisterUsername} />
            </label>
            <label>
              password:
              <input name="password" type="password" onChange={this.handleChangeRegisterPassword} />
            </label>

            <input type="submit" value="Submit" />
          </form>

          {/* <!-- Button HTML (to Trigger Modal) --> */}
          <a href="#register" data-toggle="modal">
            Register
          </a>

          {/* <!-- Modal HTML --> */}
          <div id="register" className="modal fade">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                  </button>
                  <h4 className="modal-title">Register</h4>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.submitRegister}>
                    <label>
                      username:
                      <input name="username" type="text" onChange={this.handleChangeRegisterUsername} />
                    </label>
                    <label>
                      password:
                      <input name="password" type="password" onChange={this.handleChangeRegisterPassword} />
                    </label>

                    <input type="submit" value="Submit" />
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
