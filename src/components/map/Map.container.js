// @flow

import { connect } from 'react-redux';
import { selectGeolocation } from 'Mylo/modules/geolocation';
import Map from './Map.component';

const mapStateToProps = (state: AppStateType) => ({
  geolocation: selectGeolocation(state),
});

export default connect(mapStateToProps)(Map);
