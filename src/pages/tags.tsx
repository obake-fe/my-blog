import React from 'react';
import { Layout, Container } from '@layouts/index';
import { Header, TagsBlock } from '@components/index';

function Tags({ pageContext }) {
  const { tags } = pageContext;

  return (
    <Layout>
      <Header title="Tags Page">Gatsby Tutorial Starter</Header>
      <Container>
        <TagsBlock list={tags} />
      </Container>
    </Layout>
  );
}

export default Tags;
