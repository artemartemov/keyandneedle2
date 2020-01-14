import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

function SEO({ metaDescription, lang, meta, keywords, title, title: siteTitle }) {
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
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
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: title,
        },
        {
          name: 'twitter:title',
          content: title,
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
  );
}

SEO.defaultProps = {
  lang: 'en',
  metaDescription: '',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  metaDescription: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
