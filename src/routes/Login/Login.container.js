// @flow

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Login from './Login.component';

// $FlowFixMe
import { showSnackbarActionCreator } from 'modules/snackbar';

const mapDispatchToProps = ({
  showSnackbar: showSnackbarActionCreator,
  navigateToHome: () => push('/home'),
});

export default connect(null, mapDispatchToProps)(Login);
