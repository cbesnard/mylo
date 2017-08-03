// @Flow

import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

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

snackbar.propTypes = {
  hideSnackbar: PropTypes.func,
  message: PropTypes.string,
  open: PropTypes.boolean,
}
