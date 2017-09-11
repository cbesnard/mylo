// @flow

import React, { Component } from 'react';
import Fab from 'material-ui/FloatingActionButton';
import MapMarkerIcon from 'react-icons/lib/fa/map-marker';
import SearchIcon from 'react-icons/lib/fa/search';
import appStyles from 'Mylo/style/AppStyles';
import AddLocationModal from './AddLocationModal';

const styles = {
  icon: {
    color: appStyles.colors.white,
    fontSize: appStyles.font.size.icon,
  },
  iconContainer: {
    marginLeft: appStyles.margins.small,
  },
  container: {
    padding: appStyles.margins.small,
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
        <AddLocationModal
          open={this.state.open}
          onClose={this.handleClose}
          onValueChange={(event) => this.setState({locationName: event.target.value})}
          onSubmit={this.addCurrentLocationToFavorite}
        />
      </div>
    );
  }
}
