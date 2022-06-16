import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const TagsContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  a {
    margin: 0 1rem 1rem 0;
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
`;

type Props = {
  list: { title?: string }[];
};

const TagsBlock: React.FC<Props> = ({ list }) => (
  <TagsContainer>
    {list &&
      list.map((tag) => {
        const upperTag = tag.title.charAt(0).toUpperCase() + tag.title.slice(1);
        return (
          <Link key={tag.title} to={`/tags/${tag.title}`}>
            <span>{upperTag}</span>
          </Link>
        );
      })}
  </TagsContainer>
);

export default TagsBlock;
