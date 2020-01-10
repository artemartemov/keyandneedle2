import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'components';
import { mq } from 'utils';

import customMap from './customMap.json';

const MapContainer = styled.div`
  width: 100%;
  height: 275px;

  ${mq.mobileWide`
    height: 250px;
  `}

  ${mq.tablet`
    height: 600px;
  `}

  ${mq.tabletWide`
    height: 500px;
  `}

  ${mq.desktop`
    height: 600px;
  `}
`;

const GoogleMap = ({ center, zoom, lat, lng }) => (
  // Important! Always set the container height explicitly
  <MapContainer>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyC8UnxqOui-ECIximMsrXD9zxcFJJq4RmM' }}
      defaultCenter={center}
      defaultZoom={zoom}
      options={{ styles: customMap }}
    >
      <Marker lat={lat} lng={lng} text="Key+Needle HQ" />
    </GoogleMapReact>
  </MapContainer>
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
