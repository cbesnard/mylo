// @flow

import { connect } from 'react-redux';
import { selectFavorites } from 'Mylo/modules/favorites';
import FavoriteList from './FavoriteList.component';

const mapStateToProps = (state: AppStateType) => ({
  favorites: selectFavorites(state),
});

export default connect(mapStateToProps)(FavoriteList);
