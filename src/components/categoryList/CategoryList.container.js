// @flow

import { connect } from 'react-redux'
import CategoryList from './CategoryList.component';
import { addCategoryCreator, selectCategories } from 'Mylo/modules/categories'

const mapStateToProps = (state: AppStateType) => ({
  categories: selectCategories(state),
});

const mapDispatchToProps = ({
  addCategory: addCategoryCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
