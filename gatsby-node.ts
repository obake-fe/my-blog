import path from 'path';
import { MarkdownRemark } from './types/graphql-types';

export type PageContext = {
  pageContext: {
    posts?: {
      frontmatter: {
        path: string;
        title: string;
        tags: string[];
      };
    }[];
    tagName?: string;
    tags?: string[];
    pathSlug?: string;
    prev?: MarkdownRemark | null;
    next?: MarkdownRemark | null;
  };
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.tsx');
    const tagPage = path.resolve('src/pages/tags.tsx');
    const tagPosts = path.resolve('src/templates/tag.tsx');

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: ASC, fields: [frontmatter___date] }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                    tags
                  }
                }
              }
            }
          }
        `
        // eslint-disable-next-line consistent-return
      ).then((result) => {
        if (result.errors) {
          return reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        const postsByTag = {};
        // create tags page
        posts.forEach(({ node }) => {
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach((tag) => {
              if (!postsByTag[tag]) {
                postsByTag[tag] = [];
              }

              postsByTag[tag].push(node);
            });
          }
        });

        const tags = Object.keys(postsByTag);

        createPage({
          path: '/tags',
          component: tagPage,
          context: {
            tags: tags.sort()
          }
        });

        // create tags
        tags.forEach((tagName) => {
          const postsTag = postsByTag[tagName];

          createPage({
            path: `/tags/${tagName}`,
            component: tagPosts,
            context: {
              posts: postsTag,
              tagName
            }
          });
        });

        // create posts
        posts.forEach(({ node }, index) => {
          const pathSlug = node.frontmatter.path;
          const prev = index === 0 ? null : posts[index - 1].node;
          const next =
            index === posts.length - 1 ? null : posts[index + 1].node;
          createPage({
            path: pathSlug,
            component: postTemplate,
            context: {
              pathSlug,
              prev,
              next
            }
          });
        });
      })
    );
  });
};

/* Allows named imports */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@config': path.resolve(__dirname, 'config'),
        '@static': path.resolve(__dirname, 'static')
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  });
};
