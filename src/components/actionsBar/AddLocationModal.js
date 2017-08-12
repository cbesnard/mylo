// @flow

import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

type PropsType = {
  open: boolean,
  onClose: () => void,
  onSubmit: () => void,
  onValueChange: (event: any) => void,
}

export default class AddLocationModal extends Component {
  props: PropsType;

  state = {
    open: false,
    locationName: ''
  };

  addToFavoriteModalActions = () => ([
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.props.onClose}
    />,
    <FlatButton
      label="Add"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.props.onSubmit}
    />,
  ]);

  // Handle the Autofocus
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      setTimeout(() => {
        this._textField.focus();
      },250);
    }
  }

  render() {
    return (
      <Dialog
        title="Add my position"
        modal={false}
        actions={this.addToFavoriteModalActions()}
        open={this.props.open}
        onRequestClose={this.props.onClose}
      >
        <TextField
          ref={(x) => this._textField = x}
          hintText="Name your position"
          onChange={this.props.onValueChange}
          fullWidth
        />
      </Dialog>
    );
  }
}
