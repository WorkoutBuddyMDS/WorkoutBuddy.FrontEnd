import { styled } from '@mui/system';
import { Button } from '@mui/material';
import Link from 'next/link';

export const StyledBasicButton = styled(Button)(
  ({ theme }) => `
    background-color: ${theme.palette.basic?.white};
    padding: 5px 15px;
    margin: 0 10px;
    
    &&:hover {
        background-color: ${theme.palette.backgroundColor?.container1};
    }
    
    &&:active {
        outline: 4px solid ${theme.palette.backgroundColor?.container2};
        outline-offset: 1px;
    }
`
);

export const StyledLink = styled(Link)<{ hoverable?: boolean }>(
  ({ theme }) => `
    font-weight: bold;
    text-decoration: none;
    color: ${theme.palette.secondary?.main || ''};
    margin: 0 15px;
`
);
