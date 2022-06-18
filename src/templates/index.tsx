import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { PostList } from '@components/index';
import { Layout } from '@layouts/index';
import { PagesIndexQuery } from '../../types/graphql-types';
import { PageContext } from '../../gatsby-node';

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

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  list-style: none;
  margin: 0;
`;

const PaginationList = styled.li``;

const StyledLink = styled(Link)`
  background: ${(props) => props.theme.colors.white.grey};
  display: inline-block;
  padding: 1rem;
  color: ${(props) => props.theme.colors.black.blue};
  border-radius: 10px;
  &:hover {
    color: ${(props) => props.theme.colors.white.light};
    background: ${(props) => props.theme.colors.primary.light};
    border: ${(props) => props.theme.colors.primary.light};
  }
`;

export type Props = {
  data: PagesIndexQuery;
} & PageContext;

const Index: React.FC<Props> = ({ data, pageContext }) => {
  const { edges } = data.allContentfulBlogPost;
  const { currentPage, isFirst, isLast } = pageContext;
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
        <PaginationWrapper>
          <PaginationList>
            {!isFirst && (
              <StyledLink
                to={currentPage === 2 ? '/' : `/page-${currentPage - 1}/`}
              >
                <span>前のページ</span>
              </StyledLink>
            )}
          </PaginationList>
          <PaginationList>
            {!isLast && (
              <StyledLink to={`/page-${currentPage + 1}/`}>
                <span>次のページ</span>
              </StyledLink>
            )}
          </PaginationList>
        </PaginationWrapper>
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
              excerpt(pruneLength: 75)
            }
          }
          publishDate(formatString: "MM.DD.YYYY")
        }
      }
    }
  }
`;
