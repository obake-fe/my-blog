import React from 'react';
import styled from '@emotion/styled';
import theme from '@config/theme';

const Wrapper = styled.aside`
  margin-left: 1rem;
  width: 350px;
`;

const Card = styled.div`
  padding: 2rem;
  color: ${theme.colors.white.base};
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.default};
`;

const Aside = () => (
  <Wrapper>
    <Card>テスト</Card>
  </Wrapper>
);

export default Aside;
