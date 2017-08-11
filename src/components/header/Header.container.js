// @flow

import { connect } from 'react-redux';
import { selectUser } from 'Mylo/modules/authentication';
import Header from './Header.component';

const mapStateToProps = (state: AppStateType) => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(Header);
