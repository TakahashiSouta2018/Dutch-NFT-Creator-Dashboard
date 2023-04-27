import React from 'react';
import { Oval } from 'react-loader-spinner';

interface DynamicLoaderProps {
  width?: number;
  color?: string;
}

const DynamicLoader: React.FC<DynamicLoaderProps> = ({
  width = '80',
  color = '#000',
}) => {
  return (
    <Oval
      height={width}
      width={width}
      color={color}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#888"
      strokeWidth={40}
      strokeWidthSecondary={40}
    />
  );
};

export default DynamicLoader;
