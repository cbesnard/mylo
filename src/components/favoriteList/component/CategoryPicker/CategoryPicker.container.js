// @flow

import { connect } from 'react-redux';
import { selectCategories } from 'Mylo/modules/categories';
import { pickCategoryForFavoriteCreator } from 'Mylo/modules/favorites';
import CategoryPicker from './CategoryPicker.component';

const mapStateToProps = (state: AppStateType) => ({
  categories: selectCategories(state),
});

const mapDispatchToProps = ({
  pickCategory: pickCategoryForFavoriteCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPicker);
