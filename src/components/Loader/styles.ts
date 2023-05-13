import { styled } from '@mui/system';
import { Backdrop, CircularProgress } from '@mui/material';

export const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: 2;
  }
`;

export const StyledCircularProgress = styled<{ width: string; height: string }>(
  CircularProgress
)`
  && {
    position: absolute;
    width: ${(props) => props.width} !important;
    height: ${(props) => props.height} !important;
    color: black;
  }
`;
