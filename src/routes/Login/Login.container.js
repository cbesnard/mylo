// @flow

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Login from './Login.component';
import { showSnackbarActionCreator } from 'Mylo/modules/snackbar';
import { loginActionCreator } from 'Mylo/modules/authentication';

const mapDispatchToProps = ({
  showSnackbar: showSnackbarActionCreator,
  login: loginActionCreator,
  navigateToHome: () => push('/'),
});

export default connect(null, mapDispatchToProps)(Login);
