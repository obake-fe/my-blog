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
  const { edges } = data.allContentfulBlogPost;
  return (
    <Layout>
      <Helmet title="Home Page" />
      <PostWrapper>
        {edges.map(({ node }) => {
          const { id, title, slug, tags, publishDate, contents } = node;
          return (
            <PostList
              key={id}
              path={slug}
              title={title}
              tags={tags}
              date={publishDate}
              excerpt={contents.childMarkdownRemark.excerpt}
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
    allContentfulBlogPost(
      limit: 5
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
`;
