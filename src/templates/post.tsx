import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { Layout, Container, Content } from '@layouts/index';
import { TagsBlock, Header, SEO } from '@components/index';
import '@styles/prism';
import { TemplatesPostQuery } from '../../types/graphql-types';
import { PageContext } from '../../gatsby-node';

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

type Props = {
  data: TemplatesPostQuery;
} & PageContext;

const Post = ({ data, pageContext }: Props) => {
  const { next, prev } = pageContext;
  const { html, frontmatter } = data.markdownRemark;
  const { date, title, tags, path } = frontmatter;
  const image = frontmatter.cover.childImageSharp.fluid;

  return (
    <Layout>
      <SEO title={title} pathname={path} article />
      <Header title={title} date={date} cover={image} />
      <Container>
        <Content input={html} />
        <TagsBlock list={tags || []} />
      </Container>
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
        cover {
          childImageSharp {
            fluid(
              maxWidth: 1920
              quality: 90
              duotone: { highlight: "#386eee", shadow: "#2323be", opacity: 60 }
            ) {
              # @see https://github.com/JetBrains/js-graphql-intellij-plugin/issues/236
              # ...GatsbyImageSharpFluid_withWebp
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
            resize(width: 1200, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`;
