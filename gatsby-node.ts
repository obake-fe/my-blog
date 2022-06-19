import path from 'path';
import { GatsbyNode } from 'gatsby';
import {
  ContentfulBlogPost,
  ContentfulBlogPostConnection
} from './types/graphql-types';

export type PageContext = {
  pageContext: {
    posts?: ContentfulBlogPost[];
    tagName?: string;
    tags?: string[];
    pathSlug?: string;
    skip?: number;
    limit?: number;
    currentPage?: number;
    isFirst?: boolean;
    isLast?: boolean;
    relatedPosts?: ContentfulBlogPostConnection['edges'] | [];
  };
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.tsx');
    const tagPosts = path.resolve('src/templates/tag.tsx');
    const postIndex = path.resolve('src/templates/index.tsx');

    resolve(
      graphql(
        `
          query {
            allContentfulBlogPost(
              sort: { order: DESC, fields: [publishDate] }
            ) {
              edges {
                node {
                  id
                  title
                  slug
                  tags {
                    title
                  }
                  contents {
                    childMarkdownRemark {
                      excerpt(pruneLength: 75)
                    }
                  }
                  publishDate(formatString: "MM.DD.YYYY")
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

        const posts = result.data.allContentfulBlogPost.edges;

        // create Index page
        const blogPostPerPage = 6;
        const blogPosts = posts.length;
        const blogPages = Math.ceil(blogPosts / blogPostPerPage);

        Array.from({ length: blogPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/' : `/page-${i + 1}`,
            component: postIndex,
            context: {
              skip: blogPostPerPage * i,
              limit: blogPostPerPage,
              currentPage: i + 1,
              isFirst: i + 1 === 1,
              isLast: i + 1 === blogPages
            }
          });
        });

        const postsByTag = {};
        // create tags page
        posts.forEach(({ node }) => {
          if (node.tags) {
            node.tags.forEach((tag) => {
              if (!postsByTag[tag.title]) {
                postsByTag[tag.title] = [];
              }

              postsByTag[tag.title].push(node);
            });
          }
        });

        const tags = Object.keys(postsByTag);

        // create tags
        tags.forEach((tagName) => {
          const postsTag = postsByTag[tagName];

          const blogTagPostPerPage = 6;
          const blogTagPosts = postsTag.length;
          const blogTagPages = Math.ceil(blogTagPosts / blogTagPostPerPage);

          const sortedPosts = postsTag.sort(
            (a, b) => a.publishDate - b.publishDate
          );

          Array.from({ length: blogTagPages }).forEach((_, i) => {
            createPage({
              path:
                i === 0 ? `/tags/${tagName}` : `/tags/${tagName}/page-${i + 1}`,
              component: tagPosts,
              context: {
                posts: sortedPosts.slice(i * 6, i * 6 + blogPostPerPage - 1),
                tagName,
                currentPage: i + 1,
                isFirst: i === 0,
                isLast: i + 1 === blogTagPages
              }
            });
          });
        });

        // create posts
        posts.forEach(({ node }) => {
          const pathSlug = node.slug;

          const relatedPosts = [];

          node.tags.forEach((tag) => {
            posts.forEach((post) => {
              // 記事ページと同じ記事を省く
              if (node.id === post.node.id) return;
              post.node.tags.forEach((item) => {
                if (item.title === tag.title) {
                  // すでに関連記事にpushしている記事を省く
                  if (
                    relatedPosts.findIndex(
                      (relatedPost) => relatedPost.node.id === post.node.id
                    ) !== -1
                  ) {
                    return;
                  }

                  relatedPosts.push(post);
                }
              });
            });
          });

          createPage({
            path: pathSlug,
            component: postTemplate,
            context: {
              pathSlug,
              relatedPosts
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
