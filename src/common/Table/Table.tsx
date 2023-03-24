import React from 'react';

// components
import * as DutchC from './styles';

type TableProps = JSX.IntrinsicElements['table'];
type TBodyProps = JSX.IntrinsicElements['tbody'];
type THeadProps = JSX.IntrinsicElements['thead'];
type TDProps = JSX.IntrinsicElements['td'];
type TRProps = JSX.IntrinsicElements['tr'];

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ref,
  ...rest
}) => {
  return (
    <DutchC.TableWrapper className={className}>
      <DutchC.TableContentWrapper {...rest}>
        {children}
      </DutchC.TableContentWrapper>
    </DutchC.TableWrapper>
  );
};

export const TBody: React.FC<TBodyProps> = ({
  children,
  className,
  ref,
  ...rest
}) => {
  return (
    <DutchC.TBodyWrapper className={className} {...rest}>
      {children}
    </DutchC.TBodyWrapper>
  );
};

export const THead: React.FC<THeadProps> = ({
  children,
  className,
  ref,
  ...rest
}) => {
  return (
    <DutchC.THeadWrapper className={className} {...rest}>
      {children}
    </DutchC.THeadWrapper>
  );
};

export const TD: React.FC<TDProps> = ({
  children,
  className,
  ref,
  ...rest
}) => {
  return (
    <DutchC.TDWrapper className={className} {...rest}>
      {children}
    </DutchC.TDWrapper>
  );
};

export const TResizableHeader: React.FC<TDProps> = ({
  children,
  className,
}) => {
  return (
    <DutchC.TResizableHeader className={className}>
      {children}
    </DutchC.TResizableHeader>
  );
};

export const TR: React.FC<TRProps> = ({
  children,
  className,
  ref,
  ...rest
}) => {
  return (
    <DutchC.TRWrapper className={className} {...rest}>
      {children}
    </DutchC.TRWrapper>
  );
};
