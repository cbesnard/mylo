// @flow

import { connect } from 'react-redux';
// $FlowFixMe
import { refreshGeolocation } from 'modules/geolocation';
import Homepage from './Homepage.component';

const mapDispatchToProps = ({
  refreshGeolocation: refreshGeolocation
});

export default connect(null, mapDispatchToProps)(Homepage);
