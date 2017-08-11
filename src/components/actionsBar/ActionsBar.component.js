// @flow

import React, { Component } from 'react';
import Fab from 'material-ui/FloatingActionButton';
import MapMarkerIcon from 'react-icons/lib/fa/map-marker';
import SearchIcon from 'react-icons/lib/fa/search';
import Dialog from 'material-ui/Dialog';
import SearchBar from 'material-ui-search-bar';
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
}

type PropsType = {
  addFavorite: ( lat: number, lng: number) => void,
  geolocation: GeolocationType,
}

export default class ActionsBar extends Component {
  props: PropsType;

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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
          <Fab onTouchTap={this.handleOpen}>
            <SearchIcon style={styles.icon} />
          </Fab>
        </div>
        <div style={styles.iconContainer}>
          <Fab onTouchTap={this.addCurrentLocationToFavorite}>
            <MapMarkerIcon style={styles.icon} />
          </Fab>
        </div>
        <Dialog
          title="Search a location"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <SearchBar
            onChange={() => console.log('onChange')}
            onRequestSearch={() => console.log('onRequestSearch')}
            style={{
              margin: '0 auto',
              maxWidth: 800
            }}
          />
        </Dialog>
      </div>
    );
  }
}
