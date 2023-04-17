import React from 'react';
// import './animation.css';
import Lottie from 'lottie-react';

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

  console.log(`flex rounded-lg mb-2 bg-[${bgColor}] max-h-[151px]`);

  return (
    <div
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={() => handleMouseLeave(index)}
    >
      <div
        className={`flex rounded-lg mb-2 max-h-[151px]`}
        style={{ backgroundColor: bgColor }}
        id={`light-sweep${index}`}
      >
        <Lottie
          className="flex"
          lottieRef={animationRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
        />
      </div>
      <span className="font-bold font-Satoshi text-base text-black">
        {name}
      </span>
    </div>
  );
};

export default LottieAnimationPlayer;
