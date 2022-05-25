import React from 'react';
import Helmet from 'react-helmet';
import { Header } from '@components/index';
import { Layout, Container } from '@layouts/index';

const About: React.FC = (center) => (
  <Layout>
    <Helmet title="About Page" />
    <Header title="About Page">Gatsby Tutorial Starter</Header>
    <Container center={center}>
      <h3>
        If you would like to build this site completely from scratch, you can
        read the guide{' '}
        <a href="https://justinformentin.com/gatsby-v2-guide">here.</a>
      </h3>
    </Container>
  </Layout>
);

export default About;
