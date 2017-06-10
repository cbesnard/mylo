// @flow

import React, { Component } from 'react';
import Fab from 'material-ui/FloatingActionButton';
import MapMarkerIcon from 'react-icons/lib/fa/map-marker';
import SearchIcon from 'react-icons/lib/fa/search';
import appStyles from '../../style/AppStyles';

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

export default class ActionsBar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.iconContainer}>
          <Fab>
            <SearchIcon style={styles.icon} />
          </Fab>
        </div>
        <div style={styles.iconContainer}>
          <Fab>
            <MapMarkerIcon style={styles.icon} />
          </Fab>
        </div>
      </div>
    );
  }
}