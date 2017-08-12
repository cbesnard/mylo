// @flow

import React, { Component } from 'react';
import Fab from 'material-ui/FloatingActionButton';
import MapMarkerIcon from 'react-icons/lib/fa/map-marker';
import FlatButton from 'material-ui/FlatButton';
import SearchIcon from 'react-icons/lib/fa/search';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import appStyles from 'Mylo/style/AppStyles';

const styles = {
  icon: {
    color: appStyles.colors.white,
    fontSize: appStyles.font.size.icon,
  },
  iconContainer: {
    marginLeft: appStyles.margins.small,
  },
  container: {
    padding: appStyles.margins.medium,
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  }
};

type PropsType = {
  addFavorite: (name: string, lat: number, lng: number) => void,
  geolocation: GeolocationType,
}

export default class ActionsBar extends Component {
  props: PropsType;

  state = {
    open: false,
    locationName: ''
  };

  addToFavoriteModalActions = () => ([
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
    />,
    <FlatButton
      label="Add"
      primary={true}
      keyboardFocused={true}
      onTouchTap={this.addCurrentLocationToFavorite}
    />,
  ]);

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  addCurrentLocationToFavorite = () => {
    this.props.addFavorite(
      this.state.locationName,
      this.props.geolocation.latitude,
      this.props.geolocation.longitude
    );
    this.handleClose()
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.iconContainer}>
          <Fab>
            <SearchIcon style={styles.icon} />
          </Fab>
        </div>
        <div style={styles.iconContainer}>
          <Fab onTouchTap={this.handleOpen}>
            <MapMarkerIcon style={styles.icon} />
          </Fab>
        </div>
        <Dialog
          title="Add my position"
          modal={false}
          actions={this.addToFavoriteModalActions()}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Name your position"
            onChange={(event) => this.setState({locationName: event.target.value})}
            fullWidth
          />
        </Dialog>
      </div>
    );
  }
}
