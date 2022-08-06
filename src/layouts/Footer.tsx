import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 2rem;
  bottom: 0;
  box-shadow: ${(props) => props.theme.shadow.footer};
  background: ${(props) => props.theme.gradient.leftToRight};
  font-family: ${(props) => props.theme.fontFamily.body};
  font-weight: 500;
`;

const ObakeImg = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 6px;
  margin-top: 2px;
`;

const Text = styled.div`
  margin: 0;
  padding-bottom: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.white.light};
`;

const Footer = () => (
  <Wrapper>
    <ObakeImg src="obake.png" alt="obake" />
    <Text>
      <span>Obake Engineer Blog</span>
    </Text>
  </Wrapper>
);
export default Footer;
