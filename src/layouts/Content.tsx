import React from 'react';
import styled from '@emotion/styled';
import prism from '@styles/prism';
import post from '@styles/post';

const Wrapper = styled.div`
  ${prism};
  ${post};
  p,
  li {
    letter-spacing: -0.003em;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    font-size: 1rem;
    line-height: 2;
    code {
      padding: 0.2rem 0.5rem;
      margin: 0.5rem 0;
    }
  }
  a:not(.gatsby-resp-image-link):not(.anchor) {
    color: #fff;
    box-shadow: inset 0 -2px 0 ${(props) => props.theme.colors.primary.base};
    border-bottom: 1px solid ${(props) => props.theme.colors.primary.base};
    transition: ${(props) => props.theme.transitions.default.transition};
    text-decoration: none;
    &:hover,
    &:focus {
      background: ${(props) => props.theme.colors.primary.base};
      color: #fff;
    }
  }
  h1 {
    font-weight: 600;
    margin-top: 3rem;
  }
  h2 {
    font-weight: 600;
    margin-top: 5rem;
    margin-bottom: 1.5rem;
    border-bottom: 5px solid #fff;
    padding-bottom: 6px;
    @media (max-width: 700px) {
      margin-top: 2rem;
    }
  }
  h3 {
    margin-top: 3rem;
  }
  h4 {
    margin-top: 3rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
      'Hiragino Sans', Meiryo, sans-serif;
    position: relative;
    a {
      box-shadow: none;
      border-bottom: none;
      &:hover,
      &:focus {
        background: none;
      }
    }
    &:hover {
      .anchor svg {
        opacity: 0.8;
      }
    }
  }
  .windowIcon {
    width: 16px;
    margin-left: 4px;
  }
`;

type Props = {
  input: string;
};

const Content = ({ input }: Props) => (
  <Wrapper dangerouslySetInnerHTML={{ __html: input }} />
);

export default Content;
