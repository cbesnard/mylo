// @flow

import { connect } from 'react-redux';
import { selectFavorites } from 'Mylo/modules/favorites';
import LocationList from './LocationList.component';

const mapStateToProps = (state: AppStateType) => ({
  favorites: selectFavorites(state),
});

export default connect(mapStateToProps)(LocationList);
