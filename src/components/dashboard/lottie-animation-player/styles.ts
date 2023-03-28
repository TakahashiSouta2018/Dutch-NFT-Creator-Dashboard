import styled from 'styled-components';
import Lottie from 'lottie-react';

// types
type LottieWrapperProps = {
  bgColor?: string;
};

// components
export const LottieWrapper = styled.div.attrs({
  className: 'flex rounded-lg mb-2',
})`
  background-color: ${(p: LottieWrapperProps) => p.bgColor};
`;

export const LottieAnimationWrapper = styled(Lottie).attrs({
  className: 'flex',
})``;

export const TextWrapper = styled.span.attrs({
  className: 'font-bold font-Satoshi text-base text-black',
})``;
