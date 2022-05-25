import '@emotion/react';
import { Theme as CustomTheme } from '@config/theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
