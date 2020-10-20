import { css } from '@emotion/core';
import theme from '../../config/theme';

const post = css`
  blockquote {
    border-left: 5px solid ${theme.colors.white.grey};
    color: ${theme.colors.white.grey};
    margin-left: 0;
    padding-left: 1.45rem;
  }
`;

export default post;
