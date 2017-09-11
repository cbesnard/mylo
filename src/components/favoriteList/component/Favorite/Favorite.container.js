// @flow

import { connect } from 'react-redux';
import { selectCategoryById } from 'Mylo/modules/categories';
import { deleteFavoriteCreator } from 'Mylo/modules/favorites';
import Favorite from './Favorite.component';

const mapStateToProps = (state: AppStateType, ownProps) => ({
  category: selectCategoryById(state, ownProps.favorite.categoryId),
});

const mapDispatchToProps = ({
  deleteFavorite: deleteFavoriteCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
