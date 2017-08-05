// @flow

import { connect } from 'react-redux';
import Snackbar from './snackbar.component';
import { selectSnackbarState, selectSnackbarMessage, hideSnackbarActionCreator } from 'Mylo/modules/snackbar';

const mapStateToProps = (state: AppStateType) => ({
  open: selectSnackbarState(state),
  message: selectSnackbarMessage(state),
});

const mapDispatchToProps = ({
  hideSnackbar: hideSnackbarActionCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
