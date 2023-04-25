import { styled } from '@mui/system';
import { Button } from '@mui/material';
import Link from 'next/link';

import '@fontsource/dancing-script/400.css';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/poppins/400.css';
import '@fontsource/noto-sans/400.css';

export const StyledBasicButton = styled(Button)(
  ({ theme }) => `
    background-color: ${theme.palette.basic.white};
    padding: 5px 15px;
    margin: 0 10px;
    
    &&:hover {
        background-color: ${theme.palette.backgroundColor.container1};
    }
    
    &&:active {
        outline: 4px solid ${theme.palette.backgroundColor.container2};
        outline-offset: 1px;
    }
`
);

export const StyledLink = styled(Link)<{ hoverable?: boolean }>(
  ({ theme }) => `
    font-weight: bold;
    font-family: ${theme.typography?.text1};
    text-decoration: none;
    color: ${theme.palette.secondary.main};
`
);
