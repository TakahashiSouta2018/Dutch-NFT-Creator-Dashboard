import React from 'react';
import * as DutchC from './styles';
// import './animation.css';

export interface IProps {
  animationData: any;
  bgColor: string;
  name: string;
  index: number;
}

const LottieAnimationPlayer: React.FC<IProps> = ({
  animationData,
  bgColor,
  name,
  index,
}) => {
  const animationRef: any = React.useRef();

  const handleMouseEnter = (index_id: number) => {
    // Added Light-Sweep Class
    document
      .getElementById(`light-sweep${index_id}`)
      ?.classList.add('light-sweep');

    // Play animation onMouseEnter
    animationRef.current.setDirection(1);
    animationRef.current.play();
  };

  const handleMouseLeave = (index_id: number) => {
    // Removed Light-Sweep Class
    document
      .getElementById(`light-sweep${index_id}`)
      ?.classList.remove('light-sweep');

    // Stop animataion onMouseLeave
    animationRef.current.setDirection(-1);
    animationRef.current.play();
  };

  return (
    <div
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
    >
      <DutchC.LottieWrapper
        id={`light-sweep${index}`}
        bgColor={bgColor}
        style={{ maxHeight: '151px' }}
      >
        <DutchC.LottieAnimationWrapper
          lottieRef={animationRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
        />
      </DutchC.LottieWrapper>
      <DutchC.TextWrapper>{name}</DutchC.TextWrapper>
    </div>
  );
};

export default LottieAnimationPlayer;
