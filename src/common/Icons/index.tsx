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
  xlarge: 'w-11 h-9',
};

const colors = {
  black: 'text-black/70',
  'dark-gray': 'text-black/60',
  gray: 'text-black/30',
  white: 'text-white',
  'white-gray': 'text-white/60',
  orange: 'text-primary-orange',
  'accent-red': 'text-accent-red',
  'accent-green': 'text-accent-green',
  'dark-red': 'text-dark-red',
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
    <OutlineIcons.BellIcon className={`${sizes[size]} ${colors[color]}`} />
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

export const IBigWallet: React.FC<IconProps> = ({
  variant = 'solid',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.WalletIcon className={`${colors[color]}`} />
  ) : (
    <OutlineIcons.WalletIcon className={`${colors[color]}`} />
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
    <OutlineIcons.UserIcon className={`${sizes[size]} ${colors[color]}`} />
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
    <OutlineIcons.CalendarIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IMoon: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.MoonIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.MoonIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const ISun: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.SunIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.SunIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IPlayCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.PlayCircleIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.PlayCircleIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IInformationCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.InformationCircleIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.InformationCircleIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IHome: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.HomeIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.HomeIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IArrowDownOnSquare: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ArrowDownOnSquareIcon
      className={`${sizes[size]} !${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ArrowDownOnSquareIcon
      className={`${sizes[size]} !${colors[color]}`}
    />
  );
};

export const IFunnel: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.FunnelIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.FunnelIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IChevronDown: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ChevronDownIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.ChevronDownIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IChevronUp: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ChevronUpIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.ChevronUpIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IPhoto: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.PhotoIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.PhotoIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IMinusCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.MinusCircleIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.MinusCircleIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ICheckCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.CheckCircleIcon
      className={`${sizes[size]} ${colors[color]} mx-auto`}
    />
  ) : (
    <OutlineIcons.CheckCircleIcon
      className={`${sizes[size]} ${colors[color]} `}
    />
  );
};

export const IXMark: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.XMarkIcon
      className={`${sizes[size]} ${colors[color]} p-0.5 rounded-full bg-white`}
    />
  ) : (
    <OutlineIcons.XMarkIcon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IExclamationCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ExclamationCircleIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ExclamationCircleIcon
      className={`${sizes[size]} ${colors[color]} border-none `}
    />
  );
};

export const IArrowSmallLeft: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ArrowSmallLeftIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ArrowSmallLeftIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IArrowRight: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ArrowRightIcon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.ArrowRightIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IBars3: React.FC<IconProps> = ({
  variant = 'outline',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.Bars3Icon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.Bars3Icon className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const ISquares2x2: React.FC<IconProps> = ({
  variant = 'outline',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.Squares2X2Icon className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineIcons.Squares2X2Icon
      className={`${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IEllipsisHorizontal: React.FC<IconProps> = ({
  variant = 'outline',
  size = 'medium',
  color = 'black',
}) => {
  return variant === 'solid' ? (
    <SolidIcons.EllipsisHorizontalIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.EllipsisHorizontalIcon
      className={`${sizes[size]} ${colors[color]}`}
    />
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
  'arrow-down-on-square': IArrowDownOnSquare,
  funnel: IFunnel,
  'chevron-up': IChevronUp,
  'chevron-down': IChevronDown,
  photo: IPhoto,
  'minus-circle': IMinusCircle,
  'check-circle': ICheckCircle,
  bars3: IBars3,
  squares2X2: ISquares2x2,
  close: IXMark,
  'exclamation-circle': IExclamationCircle,
  'left-arrow': IArrowSmallLeft,
  'right-arrow': IArrowRight,
  'ellipsis-horizontal': IEllipsisHorizontal,
};

export type IconType = keyof typeof icons;
