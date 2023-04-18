import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    headings: {
      heading: 'Dancing Script',
      subtitle: 'Josefin Sans',
    },
    text1: 'Poppins',
    text2: 'Noto Sans',
  },
  palette: {
    basic: {
      white: '#FFF',
      dark: '#000',
    },
    colorText: {
      main: '#202020',
      alternative: '#7E909A',
    },
    backgroundColor: {
      container1: '#F1F1F1',
      container2: '#242582',
    },
    primary: {
      dark: '#0a3c68',
      main: '#1C4E80',
      light: '#0091D5',
    },
    secondary: {
      light: '#99738E',
      main: '#F64C72',
      dark: '#553D67',
    },
    link: {
      primary_light: '#ADD9E6',
      primary: '#A5D8DD',
      primary_dark: '#7fb6bd',
      secondary_light: '#EEA47F',
      secondary: '#E88452',
      secondary_dark: '#E5743B',
      secondary_darker: '#EA6A47',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 724,
      lg: 900,
      xl: 1200,
    },
  },
});

export const mediaQuery = (key: keyof typeof theme.breakpoints.values) => {
  return (style: TemplateStringsArray | String) =>
    `@media (min-width: ${theme.breakpoints.values[key]}px) { ${style} }`;
};

export default theme;
