import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${(props) => props.theme.gradient.rightToLeft};
  height: 60px;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  color: ${(props) => props.theme.colors.white.base};
  width: 100%;
  padding: 0 4rem;
  @media (max-width: 700px) {
    padding: 0 2rem;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 700;
  color: ${(props) => props.theme.colors.white.base};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  @media (max-width: 700px) {
    font-size: 1.4rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  font-family: ${(props) => props.theme.fontFamily.body};
  font-weight: 500;
  font-size: 1.1rem;
  align-items: center;
  a {
    color: ${(props) => props.theme.colors.white.base};
    margin-left: 2rem;
    transition: all ${(props) => props.theme.transitions.default.duration};
    &:hover {
      color: ${(props) => props.theme.colors.white.grey};
    }
  }
`;

const Header = () => (
  <Wrapper>
    <Inner>
      <Title>
        <StyledLink to="/">Obake Engineer Blog</StyledLink>
      </Title>
      {/* <Nav> */}
      {/*  <Link to="/about">About</Link> */}
      {/* </Nav> */}
    </Inner>
  </Wrapper>
);

export default Header;
