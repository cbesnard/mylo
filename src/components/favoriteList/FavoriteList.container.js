// @flow

import { connect } from 'react-redux';
import { selectFavoritesFilterBySelectedCategory } from 'Mylo/modules/favorites';
import FavoriteList from './FavoriteList.component';

const mapStateToProps = (state: AppStateType) => ({
  favorites: selectFavoritesFilterBySelectedCategory(state),
});

export default connect(mapStateToProps)(FavoriteList);
