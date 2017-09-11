// @flow

import { connect } from 'react-redux';
import { selectCategoryById } from 'Mylo/modules/categories';
import Favorite from './Favorite.component';

const mapStateToProps = (state: AppStateType, ownProps) => ({
  category: selectCategoryById(state, ownProps.favorite.categoryId),
});

export default connect(mapStateToProps)(Favorite);
