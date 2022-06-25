import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

type Props = {
  children: ReactNode;
  type?: string;
  className?: string;
  center?: object;
};

const Wrapper = styled.section<Props>`
  text-align: ${(props) => (props.center ? 'center' : '')};
  padding: 3rem;
  max-width: 60rem;
  flex: 1;
  background-color: ${(props) => props.theme.colors.black.blue};
  border-radius: ${(props) => props.theme.borderRadius.default};

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 90%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 95%;
  }

  & + section {
    margin-top: 1rem;
  }
`;

const Container = ({ children, type, className, center }: Props) => (
  <Wrapper className={className} type={type} center={center}>
    {children}
  </Wrapper>
);

export default Container;
