// @flow

import { connect } from 'react-redux';
// $FlowFixMe
import { refreshGeolocation, selectGeolocation } from 'modules/geolocation';
import Map from './Map.component';

const mapStateToProps = (state: AppStateType) => ({
  geolocation: selectGeolocation(state),
});

const mapDispatchToProps = ({
  refreshGeolocation: refreshGeolocation
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
