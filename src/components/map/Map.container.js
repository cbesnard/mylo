// @flow

import { connect } from 'react-redux';
import { selectGeolocation } from 'Mylo/modules/geolocation';
import { selectFavoritesFilterBySelectedCategory } from 'Mylo/modules/favorites';
import Map from './Map.component';

const mapStateToProps = (state: AppStateType) => ({
  geolocation: selectGeolocation(state),
  favorites: selectFavoritesFilterBySelectedCategory(state),
});

export default connect(mapStateToProps)(Map);
