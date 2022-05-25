import React from 'react';
import { Layout, Container } from '@layouts/index';
import { Header, TagsBlock } from '@components/index';
import { PageContext } from '../../gatsby-node';

type Props = PageContext;

const Tags: React.FC<Props> = ({ pageContext }) => {
  const { tags } = pageContext;

  return (
    <Layout>
      <Header title="Tags Page">Gatsby Tutorial Starter</Header>
      <Container>
        <TagsBlock list={tags} />
      </Container>
    </Layout>
  );
};

export default Tags;
