import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { SeoQuery } from '../../types/graphql-types';

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        defaultTitle: title
        titleAlt
        shortName
        author
        siteLanguage
        logo
        siteUrl: url
        pathPrefix
        defaultDescription: description
        defaultBanner: banner
        twitter
      }
    }
  }
`;

type OwnProps = {
  title?: string;
  description?: string;
  pathname?: string;
  article?: boolean;
};

type Props = OwnProps & SeoQuery;

const SEO = ({
  title = null,
  description = null,
  pathname = null,
  article = false
}: Props) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        buildTime,
        siteMetadata: {
          defaultTitle,
          titleAlt,
          shortName,
          author,
          siteLanguage,
          logo,
          siteUrl,
          pathPrefix,
          defaultDescription,
          defaultBanner,
          twitter
        }
      }
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: pathname ? `/ogp${pathname}/thumbnail.png` : `/${defaultBanner}`,
        url: `${pathname || '/'}`
      };
      const realPrefix = pathPrefix === '/' ? '' : pathPrefix;
      let schemaOrgJSONLD = [
        {
          '@context': 'https://schema.org/',
          '@type': 'WebSite',
          '@id': siteUrl,
          url: siteUrl,
          name: defaultTitle,
          alternateName: titleAlt || ''
        }
      ] as unknown[];
      if (article) {
        schemaOrgJSONLD = [
          {
            '@context': 'https://schema.org/',
            '@type': 'BlogPosting',
            '@id': seo.url,
            url: seo.url,
            name: title,
            alternateName: titleAlt || '',
            headline: title,
            image: {
              '@type': 'ImageObject',
              url: seo.image
            },
            description: seo.description,
            datePublished: buildTime,
            dateModified: buildTime,
            author: {
              '@type': 'Person',
              name: author
            },
            publisher: {
              '@type': 'Organization',
              name: author,
              logo: {
                '@type': 'ImageObject',
                url: siteUrl + realPrefix + logo
              }
            },
            isPartOf: siteUrl,
            mainEntityOfPage: {
              '@type': 'WebSite',
              '@id': siteUrl
            }
          }
        ];
      }
      return (
        <Helmet title={seo.title}>
          <html lang={siteLanguage} />
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />
          <meta name="apple-mobile-web-app-title" content={shortName} />
          <meta name="application-name" content={shortName} />
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>

          {/* OpenGraph  */}
          <meta property="og:url" content={seo.url} />
          <meta property="og:type" content={article ? 'article' : null} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:image" content={seo.image} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={twitter} />
          <meta name="twitter:title" content={seo.title} />
          <meta name="twitter:description" content={seo.description} />
          <meta name="twitter:image" content={seo.image} />
        </Helmet>
      );
    }}
  />
);

export default SEO;
