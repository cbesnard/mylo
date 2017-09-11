// @flow

import { connect } from 'react-redux'
import { addCategoryCreator, selectCategories } from 'Mylo/modules/categories'
import CategoryList from './CategoryList.component';

const mapStateToProps = (state: AppStateType) => ({
  categories: selectCategories(state),
});

const mapDispatchToProps = ({
  addCategory: addCategoryCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
