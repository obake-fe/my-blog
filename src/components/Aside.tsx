import React from 'react';
import styled from '@emotion/styled';
import { graphql, Link, useStaticQuery } from 'gatsby';
import AllTagsBlock from '@components/AllTagsBlock';
import SearchModal from '@components/SearchModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMagnifyingGlass, faSquare } from '@fortawesome/free-solid-svg-icons';
import { AsideQuery } from '../../types/graphql-types';

const Wrapper = styled.aside`
  margin-left: 1rem;
  min-width: 350px;
  max-width: 350px;
  @media (max-width: 1000px) {
    width: auto;
    margin-left: 0;
  }
  @media (max-width: 700px) {
    margin: 1rem 0 0 0;
  }
`;

const Card = styled.div`
  text-align: center;
  padding: 2rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.white.base};
  background-color: ${(props) => props.theme.colors.black.blue};
  border-radius: ${(props) => props.theme.borderRadius.default};
  @media (max-width: 1000px) {
    padding: 1.4rem;
    margin-top: 1rem;
  }
  @media (max-width: 700px) {
    margin-bottom: 0;
  }
`;

const TitleList = styled.ul`
  font-size: 1rem;
`;

const TitleItem = styled.li`
  text-align: left;
  color: ${(props) => props.theme.colors.white.base};
`;

const StyledLink = styled(Link)`
  display: inline;
  color: ${(props) => props.theme.colors.white.base};
  &:hover {
    border-bottom: 2px ${(props) => props.theme.colors.primary.light} solid;
  }
`;

const Title = styled.p`
  display: inline-block;
  color: ${(props) => props.theme.colors.white.base};
  font-size: 2rem;
  text-align: center;
  border-bottom: 4px ${(props) => props.theme.colors.primary.light} solid;
`;

const IconListWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 60%;
`;

const IconList = styled.li`
  font-size: 2rem;
  list-style: none;
  margin: 0;
  width: 32px;
`;

const IconLink = styled.a`
  color: ${(props) => props.theme.colors.white.base};
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
`;

const IconQiita = styled.span`
  position: relative;
  display: block;
`;

const IconSquare = styled.span`
  position: absolute;
  top: 0;
  left: 0;
`;

const IconGrass = styled.span`
  position: absolute;
  top: 1px;
  left: -1px;
  color: #2e3246;
  font-size: 2.1rem;
`;

const Aside = () => {
  const data = useStaticQuery<AsideQuery>(
    graphql`
      query Aside {
        allContentfulBlogPost(sort: { order: ASC, fields: [publishDate] }) {
          edges {
            node {
              id
              title
              slug
              tags {
                title
              }
            }
          }
        }
      }
    `
  );

  const { edges } = data.allContentfulBlogPost;

  const postsByTag = {};
  // create tags
  edges.forEach(({ node }) => {
    if (node.tags) {
      node.tags.forEach((tag) => {
        if (!postsByTag[tag.title]) {
          postsByTag[tag.title] = [];
        }

        postsByTag[tag.title].push(node);
      });
    }
  });

  // 最近5件の投稿を表示
  const recentEdges = edges.slice(-5).reverse();

  return (
    <Wrapper>
      <Card>
        <IconListWrapper>
          <IconList>
            <IconLink href="https://twitter.com/obake_fe" target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </IconLink>
          </IconList>
          <IconList>
            <IconLink href="https://github.com/obake-fe" target="_blank">
              <FontAwesomeIcon icon={faGithub} />
            </IconLink>
          </IconList>
          <IconList>
            <IconLink href="https://qiita.com/obake_fe" target="_blank">
              <IconQiita>
                <IconSquare>
                  <FontAwesomeIcon icon={faSquare} />
                </IconSquare>
                <IconGrass>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </IconGrass>
              </IconQiita>
            </IconLink>
          </IconList>
        </IconListWrapper>
      </Card>
      <Card>
        <Title>Search</Title>
        <SearchModal edges={edges} />
      </Card>
      <Card>
        <Title>Recent Posts</Title>
        <TitleList>
          {recentEdges.map(({ node }) => {
            const { id, slug, title } = node;
            return (
              <TitleItem key={id}>
                <StyledLink to={slug}>{title}</StyledLink>
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
