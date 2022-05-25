import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Header, BlogList } from '@components/index';
import { Layout } from '@layouts/index';
import { PagesBlogQuery } from '../../types/graphql-types';

type Props = {
  data: PagesBlogQuery;
};

const Blog: React.FC<Props> = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title="Blog Page" />
      <Header title="Blog Page">Gatsby Tutorial Starter</Header>
      {edges.map(({ node }) => (
        <BlogList
          key={node.id}
          cover={node.frontmatter.cover.childImageSharp.fluid}
          path={node.frontmatter.path}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          tags={node.frontmatter.tags}
          excerpt={node.excerpt}
        />
      ))}
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query PagesBlog {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 200)
          frontmatter {
            title
            path
            tags
            date(formatString: "MM.DD.YYYY")
            cover {
              childImageSharp {
                fluid(
                  maxWidth: 1000
                  quality: 90
                  traceSVG: { color: "#2B2B2F" }
                ) {
                  # @see https://github.com/JetBrains/js-graphql-intellij-plugin/issues/236
                  # ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
