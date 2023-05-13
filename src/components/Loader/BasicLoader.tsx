import {
  StyledBackdrop,
  StyledCircularProgress,
} from '@/components/Loader/styles';

interface ILoaderProps {
  open: boolean;
}
export function BasicLoader(props: ILoaderProps) {
  return (
    <StyledBackdrop open={props.open}>
      <StyledCircularProgress width={'100px'} height={'100px'} />
      <StyledCircularProgress width={'150px'} height={'150px'} />
      <StyledCircularProgress width={'200px'} height={'200px'} />
    </StyledBackdrop>
  );
}
