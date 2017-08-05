// @flow

import { connect } from 'react-redux';
import { addFavoriteCreator } from 'Mylo/modules/favorites';
import { selectGeolocation } from 'Mylo/modules/geolocation';
import ActionsBar from './ActionsBar.component';

const mapStateToProps = (state: AppStateType) => ({
  geolocation: selectGeolocation(state),
});

const mapDispatchToProps = ({
  addFavorite: addFavoriteCreator,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionsBar);
