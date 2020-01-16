/* eslint-disable react/prop-types */
import React from 'react';
import Helmet from 'react-helmet';

export default React.memo(
  ({
    canonicalUrl,
    title,
    url,
    facebookUrl,
    twitterUrl,
    instagramUrl,
    soundcloudUrl,
    phoneNumber,
    streetAddress,
    cityAddress,
    stateAddress,
    zipAddress,
    lat,
    lng,
  }) => {
    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: title,
        image:
          'https://cdn.sanity.io/images/wr760sjc/production/be523b2298a365dca6c52f0afc2a6f7ea14fe0f2-1400x933.jpg?w=1800&h=1200&fit=crop',
        '@id': canonicalUrl,
        url,
        telephone: phoneNumber,
        priceRange: '$25-$500',
        address: {
          '@type': 'PostalAddress',
          streetAddress,
          addressLocality: cityAddress,
          addressRegion: stateAddress,
          postalCode: zipAddress,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: lat,
          longitude: lng,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        sameAs: [facebookUrl, twitterUrl, instagramUrl, soundcloudUrl],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'ProfessionalService',
        name: title,
        url,
        sameAs: [facebookUrl, twitterUrl, instagramUrl, soundcloudUrl],
        image:
          'https://cdn.sanity.io/images/wr760sjc/production/be523b2298a365dca6c52f0afc2a6f7ea14fe0f2-1400x933.jpg?w=1800&h=1200&fit=crop',
        '@id': canonicalUrl,
        telephone: phoneNumber,
        priceRange: '$25-$500',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: lat,
          longitude: lng,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress,
          addressLocality: cityAddress,
          addressRegion: stateAddress,
          postalCode: zipAddress,
          addressCountry: 'US',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '100',
          bestRating: '100',
          worstRating: '1',
          ratingCount: '13',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: phoneNumber,
          contactType: 'Customer Support',
        },
      },

      {
        '@context': 'https://schema.org/',
        '@type': 'WebSite',
        '@id': canonicalUrl,
        name: title,
        url,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: title,
        alternateName: 'Key and Needle Studios',
        url,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: phoneNumber,
          contactType: 'reservations',
          contactOption: 'TollFree',
          areaServed: 'US',
          availableLanguage: ['en', 'es', 'fr'],
        },
        sameAs: [facebookUrl, twitterUrl, instagramUrl, soundcloudUrl],
      },
    ];

    return (
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    );
  }
);
