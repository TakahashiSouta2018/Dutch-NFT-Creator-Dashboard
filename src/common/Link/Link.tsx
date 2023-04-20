import React from 'react';

// components
import * as DutchC from './styles';
import type { LinkWrapperProps } from './styles';

// types
import { LinkSizes } from '@/types';

type LinkProps = LinkWrapperProps & {
  href: string;
  children: React.ReactNode;
  size?: LinkSizes;
};

const Link: React.FC<LinkProps> = ({ href, children, size = 'large' }) => {
  return (
    <DutchC.LinkWrapper href={href} size={size}>
      {children}
    </DutchC.LinkWrapper>
  );
};

export default Link;
