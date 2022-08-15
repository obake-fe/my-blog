import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { AsideQuery } from '../../types/graphql-types';

const ModalWrapper = styled.div`
  width: auto;
`;

const SearchResultList = styled.ul`
  margin: 12px 0 0 0;
  list-style: none;
`;

const SearchResultListItem = styled.li`
  margin: 0 0 0 0;
  padding-bottom: 0.6rem;
  & + li {
    border-top: 1px solid ${(props) => props.theme.colors.black.light};
    padding-top: 0.6rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.primary.dark};
  &:hover {
    color: ${(props) => props.theme.colors.black.blue};
  }
`;

type OwnProps = {
  result: AsideQuery['allContentfulBlogPost']['edges'];
  query: string;
};

type Props = OwnProps;

const SearchResult = ({ result, query }: Props) => {
  // 最大5件まで表示する
  const dividedData = result.slice(0, 5);

  return (
    <ModalWrapper>
      <p>
        {`${query} の検索結果: ${result.length}件中 ${dividedData.length}件表示`}
      </p>
      <SearchResultList>
        {dividedData &&
          dividedData.map(({ node: post }) => (
            <SearchResultListItem key={post.slug}>
              <StyledLink to={post.slug}>
                <p>{post.title}</p>
              </StyledLink>
            </SearchResultListItem>
          ))}
      </SearchResultList>
    </ModalWrapper>
  );
};

export default SearchResult;
