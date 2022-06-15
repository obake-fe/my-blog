import React from 'react';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { Layout } from '@layouts/index';
import { site } from '@config/site';
import { PostList } from '@components/index';
import theme from '@config/theme';
import { PageContext } from '../../gatsby-node';

const PostWrapper = styled.div`
  width: 60rem;
  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 1rem 1rem;
  }
`;

const TagTitle = styled.h2`
  color: ${theme.colors.white.base};
`;

type Props = PageContext;

const Tag: React.FC<Props> = ({ pageContext }) => {
  const { posts, tagName } = pageContext;

  const sortedPosts = posts.sort((a, b) => a.publishDate - b.publishDate);
  return (
    <Layout>
      <Helmet title={`${tagName} | ${site.title}`} />
      <PostWrapper>
        <TagTitle>{tagName}の記事一覧</TagTitle>
        {sortedPosts.map((node) => {
          const { id, slug, title, tags, publishDate, contents } = node;
          return (
            <PostList
              key={id}
              path={slug}
              title={title}
              tags={tags}
              date={publishDate}
              excerpt={contents.childMarkdownRemark.excerpt}
            />
          );
        })}
      </PostWrapper>
    </Layout>
  );
};

export default Tag;
