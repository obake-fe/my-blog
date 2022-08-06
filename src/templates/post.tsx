import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import { Layout, Container, Content } from '@layouts/index';
import { TagsBlock, SEO } from '@components/index';
import '@styles/prism';
import theme from '@config/theme';
import { TemplatesPostQuery } from '../../types/graphql-types';
import { PostPageContext } from '../../gatsby-node';

const PostTitle = styled.h2`
  font-size: 4rem;
  @media (max-width: 1000px) {
    font-size: 3rem;
  }
  @media (max-width: 700px) {
    font-size: 2rem;
  }
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin: 4rem 0;
  @media (max-width: 700px) {
    margin: 0;
  }
`;

const PostDate = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const Title = styled.p`
  display: inline-block;
  color: ${theme.colors.white.base};
  font-size: 2rem;
  text-align: center;
  border-bottom: 4px ${theme.colors.primary.light} solid;
`;

const TitleList = styled.ul`
  font-size: 1rem;
`;

const TitleItem = styled.li`
  text-align: left;
  color: ${theme.colors.white.base};
`;

const StyledLink = styled(Link)`
  display: inline;
  color: ${theme.colors.white.base};
  &:hover {
    border-bottom: 2px ${(props) => props.theme.colors.primary.light} solid;
  }
`;

export type Props = {
  data: TemplatesPostQuery;
} & PostPageContext;

const Post = ({ data, pageContext }: Props) => {
  const { relatedPosts } = pageContext;
  const { slug, title, tags, publishDate, contents } = data.contentfulBlogPost;

  return (
    <Layout>
      <SEO title={title} pathname={slug} article />
      <div>
        <Container>
          <PostTitle>{title}</PostTitle>
          <PostInfo>
            <TagsBlock list={tags || []} />
            <PostDate>{publishDate}</PostDate>
          </PostInfo>
          <Content input={contents.childMarkdownRemark.html} />
        </Container>
        {relatedPosts.length > 0 && (
          <Container center>
            <Title>Related Posts</Title>
            <TitleList>
              {relatedPosts.slice(0, 4).map(({ node }) => (
                <TitleItem key={`related_${node.id}`}>
                  <StyledLink to={node.slug}>{node.title}</StyledLink>
                </TitleItem>
              ))}
            </TitleList>
          </Container>
        )}
      </div>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query templatesPost($pathSlug: String!) {
    contentfulBlogPost(slug: { eq: $pathSlug }) {
      id
      slug
      title
      tags {
        title
      }
      publishDate(formatString: "YYYY/MM/DD")
      contents {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
