import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import Search from './SearchResult';
import { AsideQuery } from '../../types/graphql-types';

const Input = styled.input`
  width: 12rem;
`;

type Props = {
  edges: AsideQuery['allContentfulBlogPost']['edges'];
};

Modal.setAppElement('#___gatsby'); // public/htmlのid参照
const SearchModal = ({ edges }: Props) => {
  const [state, setState] = useState({
    filteredData: [],
    query: ''
  });

  const handleInputChange = (event) => {
    const query = event.target.value;
    const queryArray = query.split(' ');

    const filteredData = edges.filter((post) => {
      const { title } = post.node;

      // スペース区切りの全単語に一致する記事を絞り込む
      return queryArray.every((str) =>
        title.toLowerCase().includes(str.toLowerCase())
      );
    });

    setState({
      query,
      filteredData
    });
  };

  const { filteredData, query } = state;

  return (
    <>
      <Input type="text" onChange={handleInputChange} />
      <Modal
        isOpen
        contentLabel="Seach Modal"
        className={query ? 'modalSearchWindow' : 'modalNone'}
        overlayClassName="modalSearchOverlay"
      >
        <Search result={filteredData} query={query} />
      </Modal>
    </>
  );
};
export default SearchModal;
