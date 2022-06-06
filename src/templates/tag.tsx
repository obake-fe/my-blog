import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { Layout, Container } from '@layouts/index';
import { site } from '@config/site';
import { PageContext } from '../../gatsby-node';

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.white.light};
  padding: 5px 10px;
  border: solid 1px #fff;
  border-radius: 20px;
  &:hover {
    color: ${(props) => props.theme.colors.black.blue};
    background: ${(props) => props.theme.colors.white.light};
  }
`;

const Information = styled.div`
  text-align: center;
  h1 {
    font-size: 2rem;
    margin-bottom: 1.25rem;
  }
`;

type Props = PageContext;

const Tag: React.FC<Props> = ({ pageContext }) => {
  const { posts, tagName } = pageContext;
  const upperTag = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  return (
    <Layout>
      <Helmet title={`${tagName} | ${site.title}`} />
      <StyledLink to="/tags">All Tags</StyledLink>
      <Container>
        <Information>
          {posts.map((post, index) => {
            const key = `tag_${index}`;
            return (
              <Link key={key} to={post.frontmatter.path}>
                <h3>{post.frontmatter.title}</h3>
              </Link>
            );
          })}
        </Information>
      </Container>
    </Layout>
  );
};

export default Tag;
