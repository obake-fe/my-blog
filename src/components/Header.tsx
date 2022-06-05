import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { Props as TemplatesPostProps } from '@templates/post';

const Wrapper = styled.header`
  clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    clip-path: polygon(1s00% 0, 0 0, 0 90%, 50% 100%, 100% 90%);
  }
  background: ${(props) => props.theme.gradient.rightToLeft};
  height: 300px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    height: 300px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    height: 275px;
  }
  position: relative;
  overflow: hidden;
`;

const Text = styled.div`
  color: ${(props) => props.theme.colors.white.base};
  z-index: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: ${(props) => props.theme.layout.base};
  padding: 0 2rem;
  margin-bottom: 3rem;
  align-items: center;
`;

const Subtitle = styled.p`
  max-width: 650px;
  color: ${(props) => props.theme.colors.white.light};
`;

type Props = {
  children?: ReactNode | boolean;
  title?:
    | TemplatesPostProps['data']['markdownRemark']['frontmatter']['title']
    | boolean;
  date?:
    | TemplatesPostProps['data']['markdownRemark']['frontmatter']['date']
    | boolean;
};

const Header = ({ children = false, title = false, date = false }: Props) => (
  <Wrapper>
    <Text>
      <h1>{title}</h1>
      <h3>{date}</h3>

      {children && <Subtitle>{children}</Subtitle>}
    </Text>
  </Wrapper>
);

export default Header;
