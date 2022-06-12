import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { PostList } from '@components/index';
import { Layout } from '@layouts/index';
import { PagesIndexQuery } from '../../types/graphql-types';

const PostWrapper = styled.div`
  width: 60rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

export type Props = {
  data: PagesIndexQuery;
};

const Index: React.FC<Props> = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title="Home Page" />
      <PostWrapper>
        {edges.map(({ node }) => {
          const { id, excerpt, frontmatter } = node;
          const { path, title, tags, date } = frontmatter;
          return (
            <PostList
              key={id}
              path={path}
              title={title}
              tags={tags}
              date={date}
              excerpt={excerpt}
            />
          );
        })}
      </PostWrapper>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query pagesIndex {
    allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            path
            tags
            date(formatString: "MM.DD.YYYY")
            #            cover {
            #              childImageSharp {
            #                fluid(
            #                  maxWidth: 1000
            #                  quality: 90
            #                  traceSVG: { color: "#2B2B2F" }
            #                ) {
            #                  # @see https://github.com/JetBrains/js-graphql-intellij-plugin/issues/236
            #                  # ...GatsbyImageSharpFluid_withWebp_tracedSVG
            #                  tracedSVG
            #                  aspectRatio
            #                  src
            #                  srcSet
            #                  srcWebp
            #                  srcSetWebp
            #                  sizes
            #                }
            #              }
            #            }
          }
        }
      }
    }
  }
`;
