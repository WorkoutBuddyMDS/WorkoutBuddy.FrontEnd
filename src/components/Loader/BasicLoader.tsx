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
      <StyledCircularProgress />
    </StyledBackdrop>
  );
}
