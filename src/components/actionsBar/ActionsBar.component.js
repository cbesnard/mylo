// @flow

import React, { Component } from 'react';
import Fab from 'material-ui/FloatingActionButton';
import MapMarkerIcon from 'react-icons/lib/fa/map-marker';
import SearchIcon from 'react-icons/lib/fa/search';
// $FlowFixMe
import appStyles from 'style/AppStyles';

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
}

type PropsType = {
  addFavorite: ( lat: number, lng: number) => void,
  geolocation: GeolocationType,
}


export default class ActionsBar extends Component {
  props: PropsType;

  addCurrentLocationToFavorite = () => (
    this.props.addFavorite(
      this.props.geolocation.latitude,
      this.props.geolocation.longitude
    )
  )

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.iconContainer}>
          <Fab>
            <SearchIcon style={styles.icon} />
          </Fab>
        </div>
        <div style={styles.iconContainer}>
          <Fab onClick={this.addCurrentLocationToFavorite}>
            <MapMarkerIcon style={styles.icon} />
          </Fab>
        </div>
      </div>
    );
  }
}
