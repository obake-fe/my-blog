import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

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

const SearchResult = ({ result, query }) => {
  // 最大5件まで表示する
  const dividedData = result.slice(0, 5);

  return (
    <ModalWrapper>
      <div className="result-inner">
        <div className="result-inner__res">
          {`${query} の検索結果: ${result.length}件中 ${dividedData.length}件表示`}
        </div>
        <SearchResultList>
          {dividedData &&
            dividedData.map(({ node: post }) => (
              <SearchResultListItem key={post.slug}>
                <StyledLink to={post.slug}>
                  <div className="result-inner__title">{post.title}</div>
                  <div className="result-inner__info">
                    <div className="result-inner__info-date">
                      {post.createdAt}
                    </div>
                  </div>
                </StyledLink>
              </SearchResultListItem>
            ))}
        </SearchResultList>
      </div>
    </ModalWrapper>
  );
};

export default SearchResult;
