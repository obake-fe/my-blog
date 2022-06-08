import React from 'react';
import styled from '@emotion/styled';
import theme from '@config/theme';
import { graphql, useStaticQuery } from 'gatsby';
import { TagsBlock } from '@components/index';
import { AsideQuery } from '../../types/graphql-types';

const Wrapper = styled.aside`
  margin-left: 1rem;
  width: 350px;
`;

const Card = styled.div`
  padding: 2rem;
  color: ${theme.colors.white.base};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.default};
`;

const Title = styled.p`
  color: ${theme.colors.white.base};
  font-size: 2rem;
  text-align: center;
`;

const Aside = () => {
  const data = useStaticQuery<AsideQuery>(
    graphql`
      query Aside {
        allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
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

  const tags = Object.keys(postsByTag).sort();

  return (
    <Wrapper>
      <Card>
        <Title>All Tags</Title>
        <TagsBlock list={tags} />
      </Card>
    </Wrapper>
  );
};

export default Aside;
