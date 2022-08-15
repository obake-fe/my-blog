import { css } from '@emotion/react';
import theme from '@config/theme';

const headroom = css`
  .headroom-wrapper {
    position: fixed;
    width: 100%;
    z-index: 2000;
    top: 0;
  }
  .headroom {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    padding: 1rem 1.5rem;
    svg {
      height: 2.5rem;
      g {
        fill: ${theme.colors.white.base};
      }
    }
  }
  .headroom--unfixed {
    position: relative;
    transform: translateY(0);
    transition: ${theme.transitions.headroom.transition};
  }
  .headroom--scrolled {
    transition: ${theme.transitions.headroom.transition};
  }
  .headroom--unpinned {
    position: fixed;
    transform: translateY(-100%);
    transition: ${theme.transitions.headroom.transition};
  }
  .headroom--pinned {
    position: fixed;
    transform: translateY(0);
    transition: ${theme.transitions.headroom.transition};
    background-color: ${theme.colors.white.light};
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    nav {
      a {
        color: ${theme.colors.black.base};
        &:hover {
          border-color: ${theme.colors.black.base};
          color: ${theme.colors.black.base};
        }
        &:focus {
          color: ${theme.colors.black.base};
        }
      }
    }
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    svg {
      height: 2.5rem;
      g {
        fill: ${theme.colors.black.base};
      }
    }
    span {
      color: ${theme.colors.black.base};
    }
  }
  .modalSearchWindow {
    color: ${theme.colors.black.base};
    background-color: ${theme.colors.white.base};
    z-index: 965;
    margin: 0 auto 0;
    padding: 20px 28px;
    inset: 356px -768px 0 0;
    position: absolute;
    border: 1px solid rgb(204, 204, 204);
    overflow: auto;
    border-radius: 4px;
    outline: none;
    width: 400px;
    height: fit-content;
    box-shadow: ${theme.shadow.text.small};
    @media (max-width: 1400px) {
      inset: 356px 110px 0 auto;
    }
  }
  .modalNone {
    display: none;
  }
  .modalSearchOverlay {
    z-index: 960;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

export default headroom;
