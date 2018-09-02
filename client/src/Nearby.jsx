import React, { Fragment, Component } from 'react';
import ReactLoading from 'react-loading';

import Store from './Store';

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

  render() {
    return (
      <Fragment>
        <h1>Resources Nearby</h1>
        {this.renderNearBy()}
      </Fragment>
    );
  }

  loading = () => {
    if (!this.state.isLoaded) {
      return (
        <Fragment>
          <strong>Loading...</strong>
          <ReactLoading className="loading-icon" type={'spinningBubbles'} color={'#000000'} height={'10%'} width={'10%'} />
        </Fragment>
      );
    }
  };

  renderNearBy = () => {
    if (!sessionStorage.getItem('userId')) {
      return 'Please Login to see this page!';
    }
    return (
      <Fragment>
        {this.loading()}
        <Store type={'veterinary_care'} isLoaded={this.isLoaded} establishment={'Hospital'} />
        <Store type={'pet_store'} isLoaded={this.isLoaded} establishment={'Store'} />
      </Fragment>
    );
  };

  isLoaded = () => {
    this.setState({ isLoaded: true });
  };
}
export default Nearby;
