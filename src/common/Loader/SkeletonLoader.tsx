import React from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type SkeletonLoaderProps = {
  count: number;
  height?: number | string;
  loading: boolean;
  children: React.ReactNode;
} & SkeletonProps;

const SkeletonLoader = (props: SkeletonLoaderProps) => {
  const { count, width, height, loading, children, ...rest } = props;

  return (
    <>
      {loading ? (
        <Skeleton count={count} height={height} width={width} {...rest} />
      ) : (
        children
      )}
    </>
  );
};

export default SkeletonLoader;
