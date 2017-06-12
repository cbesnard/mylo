// @flow

import { connect } from 'react-redux';
// $FlowFixMe
import { addFavoriteCreator } from 'modules/favorites';
// $FlowFixMe
import { selectGeolocation } from 'modules/geolocation';
import ActionsBar from './ActionsBar.component';

const mapStateToProps = (state: AppStateType) => ({
  geolocation: selectGeolocation(state),
});

const mapDispatchToProps = ({
  addFavorite: addFavoriteCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionsBar);
