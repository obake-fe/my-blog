export const site = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"
  title: 'Obake Engineer Blog', // Navigation and Site Title
  titleAlt: 'Obake Engineer Blog', // Title for JSONLD
  description: '幽霊エンジニアの備忘録です',
  url: 'https://smashawk.com/', // Domain of your site. No trailing slash!
  siteUrl: 'https://smashawk.com/', // url + pathPrefix
  siteLanguage: 'ja', // Language Tag on <html> element
  logo: 'static/obake.png', // Used for SEO
  banner: 'static/obake.png',
  // JSONLD / Manifest
  favicon: 'static/logo/favicon.png', // Used for manifest favicon generation
  shortName: 'Obake Engineer Blog', // shortname for manifest. MUST be shorter than 12 characters
  author: 'obake_fe', // Author for schemaORGJSONLD
  themeColor: '#3e7bf2',
  backgroundColor: '#d3e0ff',
  twitter: '@obake_fe' // Twitter Username
};
