import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { Layout, Container, Content } from '@layouts/index';
import { TagsBlock, SEO } from '@components/index';
import '@styles/prism';
import { TemplatesPostQuery } from '../../types/graphql-types';
import { PageContext } from '../../gatsby-node';

const PostTitle = styled.h2`
  font-size: 4rem;
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 4rem 0;
`;

const PostDate = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.white.light};
  box-shadow: ${(props) => props.theme.shadow.suggestion};
`;
const PostSuggestion = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 3rem 0 3rem;
`;

export type Props = {
  data: TemplatesPostQuery;
} & PageContext;

const Post = ({ data, pageContext }: Props) => {
  const { next, prev } = pageContext;
  const { html, frontmatter } = data.markdownRemark;
  const { date, title, tags, path } = frontmatter;

  return (
    <Layout>
      <SEO title={title} pathname={path} article />
      <Container>
        <PostTitle>{title}</PostTitle>
        <PostInfo>
          <TagsBlock list={tags || []} />
          <PostDate>{date}</PostDate>
        </PostInfo>
        <Content input={html} />
        <SuggestionBar>
          <PostSuggestion>
            {prev && (
              <Link to={prev.frontmatter.path}>
                Previous
                <h3>{prev.frontmatter.title}</h3>
              </Link>
            )}
          </PostSuggestion>
          <PostSuggestion>
            {next && (
              <Link to={next.frontmatter.path}>
                Next
                <h3>{next.frontmatter.title}</h3>
              </Link>
            )}
          </PostSuggestion>
        </SuggestionBar>
      </Container>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query templatesPost($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        date
        title
        tags
        path
      }
    }
  }
`;
