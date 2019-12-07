import React from 'react';
import PropTypes from 'prop-types';

import GoogleMapReact from 'google-map-react';
import { Marker } from 'components';

import customMap from './customMap.json';

const GoogleMap = ({ center, zoom, lat, lng }) => (
  // Important! Always set the container height explicitly
  <div style={{ height: '500px', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyC8UnxqOui-ECIximMsrXD9zxcFJJq4RmM' }}
      defaultCenter={center}
      defaultZoom={zoom}
      options={{ styles: customMap }}
    >
      <Marker lat={lat} lng={lng} text="Key+Needle HQ" />
    </GoogleMapReact>
  </div>
);

GoogleMap.propTypes = {
  center: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  zoom: PropTypes.number,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

GoogleMap.defaultProps = {
  center: {
    lat: 56.454,
    lng: -85.3234,
  },
  zoom: 18,
};

export default GoogleMap;
