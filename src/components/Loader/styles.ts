import { styled } from '@mui/system';
import { Backdrop, CircularProgress } from '@mui/material';

export const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: 2;
  }
`;

export const StyledCircularProgress = styled(CircularProgress)`
  && {
    position: absolute;
    color: black;
  }
`;
