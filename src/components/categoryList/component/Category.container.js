// @flow

import { connect } from 'react-redux'
import Category from './Category.component';
import { selectCategoryCreator, selectSelectedCategory } from 'Mylo/modules/categories'

const mapStateToProps = (state: AppStateType) => ({
  selectedCategory: selectSelectedCategory(state),
});

const mapDispatchToProps = ({
  selectCategory: selectCategoryCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
