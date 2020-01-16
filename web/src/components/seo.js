import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import SchemaOrg from 'components/SchemaOrg';
// import { imageUrlFor } from '../lib/image-url';
// import { buildImageObj } from '../lib/helpers';

function SEO({ description, lang, meta, keywords, title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || (data.site && data.site.description) || '';
        const siteTitle = (data.site && data.site.title) || '';
        // const metaImage =
        //   image && image.asset
        //     ? imageUrlFor(buildImageObj(image))
        //         .width(1200)
        //         .url()
        //     : '';

        return (
          <>
            <Helmet
              defer={false}
              htmlAttributes={{ lang }}
              title={siteTitle}
              titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
              link={[{ rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#010203' }]}
              meta={[
                {
                  name: 'description',
                  content: metaDescription,
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
                // {
                //   property: 'og:image',
                //   content: metaImage,
                // },
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
            />

            <SchemaOrg
              url={data.site.siteUrl}
              title={siteTitle}
              description={metaDescription}
              canonicalUrl={data.site.siteUrl}
              author="Artem Artemov"
              organization="Key+Needle"
              defaultTitle={siteTitle}
              facebookUrl={data.site.facebookUrl}
              twitterUrl={data.site.twitterUrl}
              soundcloudUrl={data.site.soundcloudUrl}
              phoneNumber={data.site.phoneNumber}
              streetAddress={data.site.streetAddress}
              cityAddress={data.site.cityAddress}
              stateAddress={data.site.stateAddress}
              zipAddress={data.site.zipAddress}
              lat={data.contact.location.lat}
              lng={data.contact.location.lng}
            />
          </>
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
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
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
    }
    contact: sanityContactPage(_id: { regex: "/(drafts.|)contactPage/" }) {
      location {
        lat
        lng
      }
    }
  }
`;
