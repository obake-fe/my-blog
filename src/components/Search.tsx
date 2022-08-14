import React from 'react';
import styled from '@emotion/styled';

const ModalWrapper = styled.div`
  z-index: 100;
  width: 500px;
`;

const SearchResult = ({ result, query }) => (
  <ModalWrapper>
    <div className="result-inner">
      <div className="result-inner__res">
        {query !== ''
          ? `${query} の検索結果: ${result.length}件`
          : `${result.length}件の記事があります`}
      </div>
      <ul className="result-inner__search">
        {result &&
          result.map(({ node: post }) => (
            <li key={post.slug}>
              <a href={`${post.slug}`}>
                <div className="result-inner__title">{post.title}</div>
                <div className="result-inner__info">
                  <div className="result-inner__info-date">
                    {post.createdAt}
                  </div>
                </div>
              </a>
            </li>
          ))}
      </ul>
    </div>
  </ModalWrapper>
);

export default SearchResult;
