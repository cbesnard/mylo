// @flow

import { connect } from 'react-redux';
import { selectGeolocation } from 'Mylo/modules/geolocation';
import { selectFavorites } from 'Mylo/modules/favorites';
import Map from './Map.component';

const mapStateToProps = (state: AppStateType) => ({
  geolocation: selectGeolocation(state),
  favorites: selectFavorites(state),
});

export default connect(mapStateToProps)(Map);
