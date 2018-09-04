import React, { Component } from 'react';
import EventCompose from './EventCompose';
import EventLocalUsers from './EventLocalUsers';
import EventUserInfo from './EventUserInfo';

//import assets

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: ''
    };

    // not logged in, redirect to home page
    if (!sessionStorage.getItem('userId')) {
      alert('Unauthorized Access! Login First!');
      this.props.history.push('/');
    }
    // does not have a pet, redirect to adopt page
    if (sessionStorage.getItem('adopted') === 'false') {
      alert('Unauthorized Access! Adopt a pet First!');
      this.props.history.push('/adopt');
    }
  }
  render() {
    return (
      <React.Fragment>
        <img id="eventbg" src={require('../../assets/events_bg3.jpeg')} alt="Girl in a jacket" />
        <div id="eventsheader">
          <p> events page </p>
        </div>
        {/* <EventUserInfo /> */}

        <div className="container-fluid">
          <div className="row-fluid">
            <div className="span4">
              <EventLocalUsers setEventName={this.setEventName} />
            </div>
            <div className="span4">
              <div id="eventbackdrop">
                {/* <div class="panel"> */}
                <EventCompose eventName={this.state.eventName} />
              </div>
            </div>
          </div>
        </div>
        <EventUserInfo />
      </React.Fragment>
    );
  }
  setEventName = eventName => {
    this.setState({ eventName });
  };
}

export default Events;
