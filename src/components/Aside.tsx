import React from 'react';
import styled from '@emotion/styled';
import theme from '@config/theme';
import { graphql, Link, useStaticQuery } from 'gatsby';
import AllTagsBlock from '@components/AllTagsBlock';
import { AsideQuery } from '../../types/graphql-types';

const Wrapper = styled.aside`
  margin-left: 1rem;
  width: 350px;
`;

const Card = styled.div`
  text-align: center;
  padding: 2rem;
  margin-bottom: 2rem;
  color: ${theme.colors.white.base};
  background-color: ${(props) => props.theme.colors.black.blue};
  border-radius: ${theme.borderRadius.default};
`;

const TitleList = styled.ul`
  font-size: 1rem;
`;

const TitleItem = styled.li`
  text-align: left;
  color: ${theme.colors.white.base};
`;

const StyledLink = styled(Link)`
  color: ${theme.colors.white.base};
`;

const Title = styled.p`
  display: inline-block;
  color: ${theme.colors.white.base};
  font-size: 2rem;
  text-align: center;
  border-bottom: 4px ${theme.colors.primary.light} solid;
`;

const Aside = () => {
  const data = useStaticQuery<AsideQuery>(
    graphql`
      query Aside {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
          edges {
            node {
              id
              frontmatter {
                path
                title
                tags
              }
            }
          }
        }
      }
    `
  );

  const { edges } = data.allMarkdownRemark;

  const postsByTag = {};
  // create tags
  edges.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach((tag) => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }

        postsByTag[tag].push(node);
      });
    }
  });

  // 最近5件の投稿を表示
  const recentEdges = edges.slice(-5).reverse();

  return (
    <Wrapper>
      <Card>
        <Title>Recent Posts</Title>
        <TitleList>
          {recentEdges.map(({ node }) => {
            const { id, frontmatter } = node;
            const { path, title } = frontmatter;
            return (
              <TitleItem key={id}>
                <StyledLink to={path}>{title}</StyledLink>
              </TitleItem>
            );
          })}
        </TitleList>
      </Card>
      <Card>
        <Title>All Tags</Title>
        <AllTagsBlock postsByTag={postsByTag} />
      </Card>
    </Wrapper>
  );
};

export default Aside;
