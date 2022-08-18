import type { GatsbyConfig } from 'gatsby';
import { site } from './config/site';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-catch-links',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 750,
            quality: 90,
            linkImagesToOriginal: true
          }
        },
        {
          resolve: 'gatsby-remark-autolink-headers',
          options: {
            offsetY: '16'
          }
        },
        'gatsby-remark-prismjs-title',
        'gatsby-remark-prismjs',
        {
          resolve: 'gatsby-remark-external-links',
          options: {
            // target=_blankの脆弱性対策
            rel: 'noopener noreferrer'
          }
        }
      ]
    }
  },
  {
    resolve: 'gatsby-plugin-emotion',
    options: {
      autoLabel: 'dev-only',
      // eslint-disable-next-line
      labelFormat: `[filename]--[local]`,
    }
  },
  {
    resolve: 'gatsby-plugin-typography',
    options: {
      pathToConfigModule: 'config/typography.ts'
    }
  },
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: site.title,
      short_name: site.shortName,
      description: site.description,
      start_url: site.pathPrefix,
      background_color: site.backgroundColor,
      theme_color: site.themeColor,
      display: 'standalone',
      icon: site.favicon
    }
  },
  'gatsby-plugin-offline',
  'gatsby-plugin-typescript',
  {
    resolve: 'gatsby-plugin-graphql-codegen',
    options: {
      fileName: 'types/graphql-types.d.ts'
    }
  },
  'gatsby-plugin-offline',
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    }
  },
  {
    resolve: 'gatsby-plugin-netlify',
    options: {
      headers: {
        '/*.html': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/page-data/*': ['Cache-Control: public, max-age=0, must-revalidate'],
        '/page-data/app-data.json': [
          'Cache-Control: public, max-age=0, must-revalidate'
        ],
        '/static/*': ['Cache-Control: public, max-age=31536000, immutable'],
        '/sw.js': ['Cache-Control: no-cache'],
        '/**/*.js': ['Cache-Control: public, max-age=31536000, immutable'],
        '/**/*.css': ['Cache-Control: public, max-age=31536000, immutable']
      }
    }
  }
];

const siteMetadata: GatsbyConfig['siteMetadata'] = {
  ...site
};

const config: GatsbyConfig = {
  siteMetadata,
  plugins
};

export default config;
