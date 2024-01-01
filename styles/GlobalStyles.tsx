// styles/GlobalStyles.tsx
import { css, Global } from '@emotion/react';

const GlobalStyles = (): JSX.Element => (
  <Global
    styles={css`
      *::-webkit-scrollbar {
        width: 10px;
      }
      *::-webkit-scrollbar-track {
        /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
      }
      *::-webkit-scrollbar-thumb {
        background-color: #545454;
        /* outline: 1px solid slategrey; */
        border-radius: 5px;
        width: 10px;
      }
      *::-webkit-scrollbar-thumb:hover {
        background: #545454;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
    `}
  />
);

export default GlobalStyles;
