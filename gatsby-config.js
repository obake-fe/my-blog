// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config/site.ts');

module.exports = {
  siteMetadata: {
    ...config
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`
      }
    },
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
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-typescript',
    'gatsby-plugin-typegen'
  ]
};
