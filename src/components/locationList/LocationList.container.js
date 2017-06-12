// @flow

import { connect } from 'react-redux';
// $FlowFixMe
import { selectFavorites } from 'modules/favorites';
import LocationList from './LocationList.component';

const mapStateToProps = (state: AppStateType) => ({
  favorites: selectFavorites(state),
});

export default connect(mapStateToProps)(LocationList);
