import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const TagsContainer = styled.div`
  text-align: left;
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
`;

const TagWrapper = styled.div`
  width: 100%;
  & + div {
    margin-top: 4px;
  }
  a {
    display: inline-block;
    color: ${(props) => props.theme.colors.black.blue};
    padding: 0.3rem 0.6rem;
    background: ${(props) => props.theme.colors.white.grey};
    border-radius: 10px;
    &:hover {
      color: ${(props) => props.theme.colors.white.light};
      background: ${(props) => props.theme.colors.primary.light};
      border: ${(props) => props.theme.colors.primary.light};
    }
  }
  @media (max-width: 1000px) {
    width: auto;
    margin: 1rem 1rem 0 0;
    & + div {
      margin: 1rem 1rem 0 0;
    }
  }
  @media (max-width: 700px) {
    margin: 0.4rem 0.4rem 0 0;
    & + div {
      margin: 0.4rem 0.4rem 0 0;
    }
    a {
      font-size: 0.7rem;
      padding: 0.2rem 0.4rem;
    }
  }
`;

type Props = {
  postsByTag: {
    [key: string]: string[];
  };
};

const AllTagsBlock: React.FC<Props> = ({ postsByTag }) => {
  // タグの多い順に並べ替える
  const tags = Object.keys(postsByTag).sort(
    (a, b) => postsByTag[b].length - postsByTag[a].length
  );

  return (
    <TagsContainer>
      {tags &&
        tags.map((tag) => {
          const upperTag = tag.charAt(0).toUpperCase() + tag.slice(1);
          const totalPosts = postsByTag[tag].length;
          return (
            <TagWrapper key={tag}>
              <Link to={`/tags/${tag}`}>
                <span>
                  {upperTag} （{totalPosts}）
                </span>
              </Link>
            </TagWrapper>
          );
        })}
    </TagsContainer>
  );
};

export default AllTagsBlock;
