import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Pagination, PostList } from '@components/index';
import { Layout } from '@layouts/index';
import { PagesIndexQuery } from '../../types/graphql-types';
import { IndexPageContext } from '../../gatsby-node';

const PostWrapper = styled.div`
  width: 60rem;
  @media (max-width: 1000px) {
    width: auto;
  }
`;

export type Props = {
  data: PagesIndexQuery;
} & IndexPageContext;

const Index: React.FC<Props> = ({ data, pageContext }) => {
  const { edges } = data.allContentfulBlogPost;
  const { currentPage, isFirst, isLast } = pageContext;
  return (
    <Layout>
      <Helmet title="Obake Engineer Blog" />
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
        <Pagination
          path="/"
          currentPage={currentPage}
          isFirst={isFirst}
          isLast={isLast}
        />
      </PostWrapper>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query pagesIndex($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { order: DESC, fields: [publishDate] }
      skip: $skip
      limit: $limit
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
              excerpt(pruneLength: 120)
            }
          }
          publishDate(formatString: "YYYY/MM/DD")
        }
      }
    }
  }
`;
