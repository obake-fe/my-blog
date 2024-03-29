import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { Props as PagesIndexProps } from '@templates/index';
import { TagsBlock } from '@components/index';

const Wrapper = styled.article`
  margin-bottom: 1rem;
  position: relative;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.black.blue};
  border-radius: ${(props) => props.theme.borderRadius.default};
  box-shadow: ${(props) => props.theme.shadow.feature.small.default};
  height: 18rem;
  max-width: 60rem;
  width: 100%;

  @media (max-width: 700px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    height: auto;
    margin-bottom: 1.2rem;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  line-height: 1.8;
  margin-bottom: 1.6rem;
`;

const Info = styled.div`
  height: 100%;
  color: ${(props) => props.theme.colors.white.light};
  padding: 2rem;
  @media (max-width: 700px) {
    padding: 1.4rem 1.4rem;
  }
`;

const Title = styled.h2`
  display: inline;
  color: ${(props) => props.theme.colors.white.light};
  &:hover {
    border-bottom: 2px ${(props) => props.theme.colors.primary.light} solid;
  }
`;

const ButtonLink = styled(Link)`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  color: ${(props) => props.theme.colors.black.blue};
  background-color: ${(props) => props.theme.colors.white.grey};
  border-radius: ${(props) => props.theme.borderRadius.default};
  padding: 0.5rem;
  &:hover {
    color: ${(props) => props.theme.colors.white.light};
    background: ${(props) => props.theme.colors.primary.light};
    border: ${(props) => props.theme.colors.primary.light};
  }
  @media (max-width: 700px) {
    right: auto;
    bottom: auto;
    display: inline-block;
    position: relative;
    left: calc(100% - 96px);
    margin-top: 1.4rem;
  }
`;

type Node =
  PagesIndexProps['data']['allContentfulBlogPost']['edges'][number]['node'];

type Props = {
  path: Node['slug'];
  date: Node['publishDate'];
  title: Node['title'];
  tags: Node['tags'];
  excerpt: Node['contents']['childMarkdownRemark']['excerpt'];
};

const PostList = ({ path, date, title, tags, excerpt }: Props) => (
  <Wrapper>
    <Info>
      <StyledLink to={path}>
        <Title>{title}</Title>
      </StyledLink>
      <SubWrapper>
        <TagsBlock list={tags} />
        <div>{date}</div>
      </SubWrapper>
      <div>{excerpt}</div>
      <ButtonLink to={path}>続きを読む</ButtonLink>
    </Info>
  </Wrapper>
);

export default PostList;
