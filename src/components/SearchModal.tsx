import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import Search from './search';
import { AsideQuery } from '../../types/graphql-types';

type StyleProps = {
  text: boolean;
};

const ModalWrapper = styled.div<StyleProps>`
  display: ${(props) => (props.text ? 'block' : 'none')};
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

  const { filteredData, query } = state;
  console.log('🐳', filteredData);
  console.log('✨', query);
  return (
    <div>
      <input type="text" onChange={handleInputChange} />
      <Modal
        isOpen
        contentLabel="Seach Modal"
        className={query ? 'modalSearchWindow' : 'modalNone'}
        overlayClassName="modalSearchOverlay"
      >
        <Search result={filteredData} query={query} />
      </Modal>
    </div>
  );
};
export default SearchModal;
