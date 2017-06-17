// @flow

import { connect } from 'react-redux';
// $FlowFixMe
import { selectGeolocation } from 'modules/geolocation';
import Map from './Map.component';

const mapStateToProps = (state: AppStateType) => ({
  geolocation: selectGeolocation(state),
});

export default connect(mapStateToProps)(Map);
