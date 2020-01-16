/* eslint-disable react/prop-types */
import React from 'react';
import Helmet from 'react-helmet';

export default React.memo(
  ({
    canonicalUrl,
    datePublished,
    defaultTitle,
    description,
    image,
    isBlogPost,
    organization,
    title,
    url,
    facebookUrl,
    twitterUrl,
    instagramUrl,
    soundcloudUrl,
  }) => {
    const baseSchema = [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: title,
        image:
          'https://cdn.sanity.io/images/wr760sjc/production/be523b2298a365dca6c52f0afc2a6f7ea14fe0f2-1400x933.jpg?w=1800&h=1200&fit=crop',
        '@id':
          'https://cdn.sanity.io/images/wr760sjc/production/be523b2298a365dca6c52f0afc2a6f7ea14fe0f2-1400x933.jpg?w=1800&h=1200&fit=crop',
        url,
        telephone: '(929) 283-3795',
        priceRange: '$25-$500',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '101 N 10th St #303',
          addressLocality: 'Brooklyn',
          addressRegion: 'NY',
          postalCode: '11211',
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.7207495',
          longitude: '-73.95765389999997',
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
        '@id':
          'https://cdn.sanity.io/images/wr760sjc/production/be523b2298a365dca6c52f0afc2a6f7ea14fe0f2-1400x933.jpg?w=1800&h=1200&fit=crop',
        telephone: '(929) 283-3795',
        priceRange: '$25-$500',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '40.7207495',
          longitude: '-73.95765389999997',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '101 N 10th St #303',
          addressLocality: 'Brooklyn',
          addressRegion: 'NY',
          postalCode: '11211',
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
          telephone: '(929) 283-3795',
          contactType: 'Customer Support',
        },
      },

      {
        '@context': 'https://schema.org/',
        '@type': 'WebSite',
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
          telephone: '(929) 283-3795',
          contactType: 'reservations',
          contactOption: 'TollFree',
          areaServed: 'US',
          availableLanguage: ['en', 'es', 'fr'],
        },
        sameAs: [facebookUrl, twitterUrl, instagramUrl, soundcloudUrl],
      },
    ];

    const schema = isBlogPost
      ? [
          ...baseSchema,
          {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id': url,
                  name: title,
                  image,
                },
              },
            ],
          },
          {
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            url,
            name: title,
            alternateName: defaultTitle,
            headline: title,
            image: {
              '@type': 'ImageObject',
              url: image,
            },
            description,

            publisher: {
              '@type': 'Organization',
              url: organization.url,
              logo: organization.logo,
              name: organization.name,
            },
            mainEntityOfPage: {
              '@type': 'WebSite',
              '@id': canonicalUrl,
            },
            datePublished,
          },
        ]
      : baseSchema;

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    );
  }
);
