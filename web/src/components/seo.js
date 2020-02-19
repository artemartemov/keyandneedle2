import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, keywords }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || (data.siteSettings && data.siteSettings.description) || '';
        const siteTitle = (data.siteSettings && data.siteSettings.title) || '';
        const siteData = data && data.siteSettings;
        const contactData = data && data.contact;

        const schema = [
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: siteTitle,
            image:
              'https://cdn.sanity.io/images/wr760sjc/production/be523b2298a365dca6c52f0afc2a6f7ea14fe0f2-1400x933.jpg?w=1800&h=1200&fit=crop',
            '@id': siteData.canonicalUrl,
            url: siteData.siteUrl,
            telephone: siteData.phoneNumber,
            priceRange: '$25-$500',
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteData.streetAddress,
              addressLocality: siteData.cityAddress,
              addressRegion: siteData.stateAddress,
              postalCode: siteData.zipAddress,
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: contactData.lat,
              longitude: contactData.lng,
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
            sameAs: [siteData.facebookUrl, siteData.twitterUrl, siteData.instagramUrl, siteData.soundcloudUrl],
          },
          {
            '@context': 'http://schema.org',
            '@type': 'ProfessionalService',
            name: siteData.title,
            url: siteData.siteUrl,
            sameAs: [siteData.facebookUrl, siteData.twitterUrl, siteData.instagramUrl, siteData.soundcloudUrl],
            image:
              'https://cdn.sanity.io/images/wr760sjc/production/be523b2298a365dca6c52f0afc2a6f7ea14fe0f2-1400x933.jpg?w=1800&h=1200&fit=crop',
            '@id': siteData.canonicalUrl,
            telephone: siteData.phoneNumber,
            priceRange: '$25-$500',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: contactData.lat,
              longitude: contactData.lng,
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteData.streetAddress,
              addressLocality: siteData.cityAddress,
              addressRegion: siteData.stateAddress,
              postalCode: siteData.zipAddress,
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
              telephone: siteData.phoneNumber,
              contactType: 'Customer Support',
            },
          },

          {
            '@context': 'https://schema.org/',
            '@type': 'WebSite',
            '@id': siteData.canonicalUrl,
            name: siteData.title,
            url: siteData.siteUrl,
            dateModified: data.site.buildTime,
            image: {
              '@type': 'ImageObject',
              url: siteData.siteImage.asset.url,
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteData.title,
            alternateName: 'Key and Needle Studios',
            url: siteData.siteUrl,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: siteData.phoneNumber,
              contactType: 'reservations',
              contactOption: 'TollFree',
              areaServed: 'US',
              availableLanguage: ['en', 'es', 'fr'],
            },
            sameAs: [siteData.facebookUrl, siteData.twitterUrl, siteData.instagramUrl, siteData.soundcloudUrl],
          },
        ];

        return (
          <Helmet
            defer={false}
            htmlAttributes={{ lang }}
            title={siteTitle}
            titleTemplate={data.siteSettings.title === siteTitle ? '%s' : `%s | ${siteTitle}`}
            link={[{ rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#010203' }]}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                name: 'image',
                content: siteData.siteImage.asset.url,
              },
              {
                property: 'og:title',
                content: siteTitle,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:url',
                content: siteData.siteUrl,
              },
              {
                property: 'og:image',
                content: siteData.siteImage.asset.url,
              },
              {
                property: 'og:image:alt',
                content: siteData.siteImage.alt,
              },
              {
                property: 'og:image:type',
                content: 'image/jpeg',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:title',
                content: siteTitle,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:image',
                content: siteData.siteImage.asset.url,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : []
              )
              .concat(meta)}
          >
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      buildTime
    }
    siteSettings: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      siteUrl
      facebookUrl
      twitterUrl
      soundcloudUrl
      phoneNumber
      streetAddress
      cityAddress
      stateAddress
      zipAddress
      siteImage {
        alt
        asset {
          url
        }
      }
    }
    contact: sanityContactPage(_id: { regex: "/(drafts.|)contactPage/" }) {
      location {
        lat
        lng
      }
    }
  }
`;
