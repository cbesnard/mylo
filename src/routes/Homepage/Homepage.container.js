// @flow

import { connect } from 'react-redux';
import { refreshGeolocation } from 'Mylo/modules/geolocation';
import Homepage from './Homepage.component';

const mapDispatchToProps = ({
  refreshGeolocation: refreshGeolocation
});

export default connect(null, mapDispatchToProps)(Homepage);
