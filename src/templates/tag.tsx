import React from 'react';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { Layout } from '@layouts/index';
import { site } from '@config/site';
import { Pagination, PostList } from '@components/index';
import theme from '@config/theme';
import { TagsPageContext } from '../../gatsby-node';

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

type Props = TagsPageContext;

const Tag: React.FC<Props> = ({ pageContext }) => {
  const { posts, tagName, currentPage, isFirst, isLast } = pageContext;

  return (
    <Layout>
      <Helmet title={`${tagName} | ${site.title}`} />
      <PostWrapper>
        <TagTitle>{tagName}の記事一覧</TagTitle>
        {posts.map((node) => {
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
        <Pagination
          path={`/tags/${tagName}/`}
          currentPage={currentPage}
          isFirst={isFirst}
          isLast={isLast}
        />
      </PostWrapper>
    </Layout>
  );
};

export default Tag;
