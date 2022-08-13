import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import Search from './search';

const ModalWrapper = styled.div``;

Modal.setAppElement('#___gatsby'); // public/htmlのid参照
const SearchModal = ({ edges }) => {
  const emptyQuery = '';
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery
  });

  const [text, setText] = React.useState('');

  const allPosts = edges;

  const handleInputChange = (event) => {
    setText(event.target.value);
    const query = event.target.value;
    const posts = edges || [];

    console.log('🐛', posts);

    const filteredData = posts.filter((post) => {
      const { title } = post.node;
      return title.toLowerCase().includes(query.toLowerCase());
    });
    setState({
      query,
      filteredData
    });
  };

  const sampleRef = React.useRef(null);

  const { filteredData, query } = state;
  const hasSearchResults = filteredData && query !== emptyQuery;
  const result = hasSearchResults ? filteredData : allPosts;
  console.log('🐳', result);
  console.log('✨', query);
  return (
    <ModalWrapper>
      <input type="text" onChange={handleInputChange} ref={sampleRef} />
      <Modal
        isOpen={!!text}
        contentLabel="Seach Modal"
        className="modalSearchWindow"
        overlayClassName="modalSearchOverlay"
      >
        <Search
          result={result}
          query={query}
          sampleRef={sampleRef}
          text={text}
        />
      </Modal>
    </ModalWrapper>
  );
};
export default SearchModal;
