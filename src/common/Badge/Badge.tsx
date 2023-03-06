import React from 'react';

// components
import * as DutchC from './styles';

// icons
import { icons, IconType } from '../Icons';

// types
import { BadgeVariants } from '@/types';

interface BadgeProps {
  variant: BadgeVariants;
  label: string;
  icon?: IconType;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  label = '',
  icon,
}) => {
  const Icon = icon ? icons[icon] : null;

  return (
    <DutchC.BadgeWrapper variant={variant}>
      {Icon && (
        <DutchC.BadgeIconWrapper>
          <Icon variant="outline" size="medium" color="black" />
        </DutchC.BadgeIconWrapper>
      )}
      <DutchC.BadgeIconLabel>{label}</DutchC.BadgeIconLabel>
    </DutchC.BadgeWrapper>
  );
};

export default Badge;
