import { styled } from '@mui/system';
import { Button } from '@mui/material';

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
