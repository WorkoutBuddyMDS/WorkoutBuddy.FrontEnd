import {
  StyledBackdrop,
  StyledCircularProgress,
} from '@/components/Loader/styles';
import React from 'react';
interface ILoaderProps {
  open: boolean;
}
export function BasicLoader(props: ILoaderProps) {
  return (
    <StyledBackdrop open={props.open}>
      <StyledCircularProgress />
    </StyledBackdrop>
  );
}
