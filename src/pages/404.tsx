import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Header } from '@components/index';
import { Layout, Container } from '@layouts/index';

function ErrorPage(center) {
  return (
    <Layout>
      <Helmet title="404" />
      <Header title="404" />
      <Container center={center}>
        <h1>Woops, something went wrong.</h1>
        <h3>This page does not exist or is no longer reachable.</h3>
        <h3>
          You can return to the <Link to="/">Homepage</Link>.
        </h3>
      </Container>
    </Layout>
  );
}

export default ErrorPage;

ErrorPage.propTypes = {
  center: PropTypes.object
};
