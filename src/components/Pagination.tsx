import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { IndexPageContext } from '../../gatsby-node';

const PaginationWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  list-style: none;
  margin: 0;
`;

const PaginationList = styled.li``;

const StyledLink = styled(Link)`
  background: ${(props) => props.theme.colors.white.grey};
  display: inline-block;
  padding: 1rem;
  color: ${(props) => props.theme.colors.black.blue};
  border-radius: 10px;
  &:hover {
    color: ${(props) => props.theme.colors.white.light};
    background: ${(props) => props.theme.colors.primary.light};
    border: ${(props) => props.theme.colors.primary.light};
  }
`;

type Props = {
  path: string;
  currentPage: IndexPageContext['pageContext']['currentPage'];
  isFirst: IndexPageContext['pageContext']['isFirst'];
  isLast: IndexPageContext['pageContext']['isLast'];
};

const Pagination = ({ path, currentPage, isFirst, isLast }: Props) => (
  <PaginationWrapper>
    <PaginationList>
      {!isFirst && (
        <StyledLink
          to={currentPage === 2 ? path : `${path}page-${currentPage - 1}/`}
        >
          <span>前のページ</span>
        </StyledLink>
      )}
    </PaginationList>
    <PaginationList>
      {!isLast && (
        <StyledLink to={`${path}page-${currentPage + 1}/`}>
          <span>次のページ</span>
        </StyledLink>
      )}
    </PaginationList>
  </PaginationWrapper>
);

export default Pagination;
