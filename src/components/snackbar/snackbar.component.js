// @Flow

import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class snackbar extends Component {

  render() {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={4000}
        onRequestClose={this.props.hideSnackbar}
      />
    );
  }
}
