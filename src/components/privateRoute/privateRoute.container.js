// @flow

import { connect } from 'react-redux';
import { isAuthenticated } from 'Mylo/modules/authentication';
import PrivateRoute from './privateRoute.component';

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
  }
}

export default connect(mapStateToProps)(PrivateRoute)