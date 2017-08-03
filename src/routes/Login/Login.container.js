// @flow

import { connect } from 'react-redux';
import Login from './Login.component';

// $FlowFixMe
import { showSnackbarActionCreator } from 'modules/snackbar';

const mapDispatchToProps = ({
  showSnackbar: showSnackbarActionCreator,
});

export default connect(null, mapDispatchToProps)(Login);
