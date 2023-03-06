import React from 'react';
import SolidIcons from '@heroicons/react/24/solid';
import OutlineIcons from '@heroicons/react/24/outline';

// type
import { IconVariants } from '@/types';

type IconProps = IconVariants;

const sizes = {
  small: 'w-3 h-3',
  medium: 'w-4 h-4',
  large: 'w-5 h-5',
};

const colors = {
  black: "text-black/70",
  "dark-gray": "text-black/60",
  gray: "text-black/30",
  white: "text-white",
  orange: "text-primary-orange",
};

export const ISearch: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return (
    <SolidIcons.MagnifyingGlassIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IBell: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.BellIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.BellIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IWallet: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.WalletIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.WalletIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IUser: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.UserIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.UserIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const ICalendar: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.CalendarIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.CalendarIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IMoon: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidIcons.MoonIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.MoonIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const ISun: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidIcons.SunIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.SunIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IPlayCircle: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidIcons.PlayCircleIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.PlayCircleIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IInformationCircle: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidIcons.InformationCircleIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <SolidIcons.InformationCircleIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IHome: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidIcons.HomeIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.HomeIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IArrowDownOnSquare: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidIcons.ArrowDownOnSquareIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <SolidIcons.ArrowDownOnSquareIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IFunnel: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidIcons.FunnelIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <SolidIcons.FunnelIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const icons = {
  bell: IBell,
  wallet: IWallet,
  user: IUser,
  calendar: ICalendar,
  moon: IMoon,
  sun: ISun,
  play: IPlayCircle,
  informationcircle: IInformationCircle,
  home: IHome,
  "arrow-down-on-square": IArrowDownOnSquare,
  funnel: IFunnel,
};

export type IconType = keyof typeof icons;
