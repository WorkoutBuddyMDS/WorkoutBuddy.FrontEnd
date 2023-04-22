import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: 10px;
    outline: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
    max-width: 400px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `
);
