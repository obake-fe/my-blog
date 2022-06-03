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
  margin: auto;
  padding: 3rem 1.5rem;
  width: 60%;
  max-width: ${(props) => props.theme.layout[props.type]};
  height: 100%;
  flex: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 90%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 95%;
  }
`;

const Container = ({ children, type, className, center }: Props) => (
  <Wrapper className={className} type={type} center={center}>
    {children}
  </Wrapper>
);

export default Container;
