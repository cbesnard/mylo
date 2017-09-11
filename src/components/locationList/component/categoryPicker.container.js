// @flow

import { connect } from 'react-redux'
import { selectCategories } from 'Mylo/modules/categories'
import CategoryPicker from './categoryPicker.component';

const mapStateToProps = (state: AppStateType) => ({
  categories: selectCategories(state),
});

export default connect(mapStateToProps)(CategoryPicker);