import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Tooltip, Overlay } from 'react-bootstrap';

import Clippy from './Clippy';

class Footer extends Component {
  constructor(props) {
    super(props);

    // create a reference to the clippy component
    this.clippy = React.createRef();
  }

  render() {
    return this.renderClippy();
  }

  renderClippy = () => {
    if (this.props.show == true) {
      const clippyMessages = {
        adopted: this.adoptedMessage,
        empty: '?'
      };

      return (
        <div className="navbar navbar-fixed-bottom">
          <Clippy ref={this.clippy} />
          <Overlay container={this} show={this.props.show} placement="top" target={() => ReactDOM.findDOMNode(this.clippy.current)}>
            <Tooltip id="tooltip">{clippyMessages[this.props.text]()}</Tooltip>
          </Overlay>
        </div>
      );
    }
    return '';
  };

  adoptedMessage = () => {
    return (
      <Fragment>
        Adopted Pet! Click <Link to="/events">here</Link> for Events!
      </Fragment>
    );
  };
}

export default Footer;
