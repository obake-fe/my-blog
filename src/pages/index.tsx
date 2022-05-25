import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Header, PostList } from '@components/index';
import { Layout } from '@layouts/index';
import { PagesIndexQuery } from '../../types/graphql-types';

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 4rem 4rem 1rem 4rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

type Props = {
  data: PagesIndexQuery;
};

const Index: React.FC<Props> = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet title="Home Page" />
      <Header title="Obake Engineer Blog">幽霊社員の備忘録です</Header>
      <PostWrapper>
        {edges.map(({ node }) => {
          const { id, excerpt, frontmatter } = node;
          const { cover, path, title, date } = frontmatter;
          return (
            <PostList
              key={id}
              cover={cover.childImageSharp.fluid}
              path={path}
              title={title}
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
      limit: 6
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 75)
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
