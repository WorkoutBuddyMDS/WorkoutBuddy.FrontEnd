import 'styled-components';
import { Theme } from '@mui/material/styles';
import React from 'react';
import { PaletteColor } from '@mui/material';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    headings: {
      heading: React.CSSProperties['fontFamily'];
      subtitle: React.CSSProperties['fontFamily'];
    };
    text1: React.CSSProperties['fontFamily'];
    text2: React.CSSProperties['fontFamily'];
  }

  interface TypographyVariantsOptions {
    headings: {
      heading?: React.CSSProperties['fontFamily'];
      subtitle?: React.CSSProperties['fontFamily'];
    };
    text1?: React.CSSProperties['fontFamily'];
    text2?: React.CSSProperties['fontFamily'];
  }

  interface Palette {
    basic: Palette['primary'];
    colorText: Palette['primary'];
    backgroundColor: Palette['primary'];
    link: Palette['primary'];
  }

  interface PaletteOptions {
    basic: {
      white: string;
      dark: string;
    };
    colorText: {
      main: string;
      alternative: string;
    };
    backgroundColor: {
      container1: string;
      container2: string;
    };
    link: {
      primary_light: string;
      primary: string;
      primary_dark: string;
      secondary_light: string;
      secondary: string;
      secondary_dark: string;
      secondary_darker: string;
    };
  }

  interface PaletteColor {
    white: PaletteColor['white'];
    dark: PaletteColor['dark'];
    main: PaletteColor['main'];
    alternative: PaletteColor['alternative'];
    container1: PaletteColor['container1'];
    container2: PaletteColor['container2'];
    primary_light: PaletteColor['primary_light'];
    primary_dark: PaletteColor['primary_dark'];
    secondary_light: PaletteColor['secondary_light'];
    secondary_dark: PaletteColor['secondary_dark'];
    secondary_darker: PaletteColor['secondary_darker'];
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
