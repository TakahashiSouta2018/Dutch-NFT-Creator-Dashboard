import React from 'react';
import SolidIcons from '@heroicons/react/24/solid';
import OutlineIcons from '@heroicons/react/24/outline';
import SolidIcons20 from '@heroicons/react/20/solid';
import CardIcon from '../../assets/card.svg';
import ExchangeIcon from '../../assets/exchange.svg';
import FriendsIcon from '../../assets/friends.svg';
import GasIcon from '../../assets/gas.svg';
import DiamondIcon from '../../assets/diamond.svg';
import TriangleX2 from '../../assets/triangleX2.svg';
import Fire from '../../assets/fire.svg';

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
  'accent-blue': 'text-accent-blue',
};

export const ISearch: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return (
    <SolidIcons.MagnifyingGlassIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ISearchPlus: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return (
    <SolidIcons.MagnifyingGlassPlusIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IBell: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.BellIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.BellIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IWallet: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.WalletIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.WalletIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IBigWallet: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.WalletIcon className={`${className} ${colors[color]}`} />
  ) : (
    <OutlineIcons.WalletIcon className={`${className} ${colors[color]}`} />
  );
};

export const IUser: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.UserIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.UserIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ICalendar: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.CalendarIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.CalendarIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IMoon: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.MoonIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.MoonIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ISun: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.SunIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.SunIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IPlayCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.PlayCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.PlayCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IInformationCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.InformationCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.InformationCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IHome: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.HomeIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.HomeIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IArrowDownOnSquare: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ArrowDownOnSquareIcon
      className={`${className} ${sizes[size]} !${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ArrowDownOnSquareIcon
      className={`${className} ${sizes[size]} !${colors[color]}`}
    />
  );
};

export const IFunnel: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.FunnelIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.FunnelIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IChevronDown: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ChevronDownIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ChevronDownIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IChevronUp: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ChevronUpIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ChevronUpIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IPhoto: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.PhotoIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.PhotoIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IMinusCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.MinusCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.MinusCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ICheckCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.CheckCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]} mx-auto`}
    />
  ) : (
    <OutlineIcons.CheckCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]} `}
    />
  );
};

export const IXMark: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.XMarkIcon
      className={`${className} ${sizes[size]} ${colors[color]} p-0.5 rounded-full bg-white`}
    />
  ) : (
    <OutlineIcons.XMarkIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IExclamationCircle: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ExclamationCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ExclamationCircleIcon
      className={`${className} ${sizes[size]} ${colors[color]} border-none `}
    />
  );
};

export const IArrowSmallLeft: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ArrowSmallLeftIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ArrowSmallLeftIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IArrowRight: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.ArrowRightIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ArrowRightIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IBars3: React.FC<IconProps> = ({
  variant = 'outline',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.Bars3Icon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.Bars3Icon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ISquares2x2: React.FC<IconProps> = ({
  variant = 'outline',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.Squares2X2Icon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.Squares2X2Icon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IEye: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.EyeIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.EyeIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IDocument: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.DocumentIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.DocumentIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ICheckBadge: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.CheckBadgeIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.CheckBadgeIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IEllipsisHorizontal: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.EllipsisHorizontalIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.EllipsisHorizontalIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IPlus: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.PlusIcon
      className={`${className} ${sizes[size]} ${colors[color]} text-white`}
    />
  ) : (
    <OutlineIcons.PlusIcon
      className={`${className} ${sizes[size]} ${colors[color]} text-white`}
    />
  );
};

export const IPencil: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.PencilIcon
      className={`${className} ${sizes[size]} ${colors[color]} text-white`}
    />
  ) : (
    <OutlineIcons.PencilIcon
      className={`${className} ${sizes[size]} ${colors[color]} text-white`}
    />
  );
};

export const IChevronRight: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.ChevronRightIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ChevronRightIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IArrowUpOnSquare: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.ArrowUpOnSquareIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ArrowUpOnSquareIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IBookOpen: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.BookOpenIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.BookOpenIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ISquare2Stack: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.Square2StackIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.Square2StackIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const ILockClosed: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.LockClosedIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.LockClosedIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IChevronLeft: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.ChevronLeftIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ChevronLeftIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IArrowUpRight: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.ArrowUpRightIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ArrowUpRightIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

export const IShoppingBag: React.FC<IconProps & { currentColor?: string }> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons20.ShoppingBagIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.ShoppingBagIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  );
};

// ------------ Custom SVGs --------------- //

export const ICustomCard: React.FC<{ currentColor: string }> = ({
  currentColor,
}) => {
  return <CardIcon currentColor={currentColor} />;
};

export const ICustomExchange: React.FC<{ currentColor: string }> = ({
  currentColor,
}) => {
  return <ExchangeIcon currentColor={currentColor} />;
};

export const ICustomFriends: React.FC<{ currentColor: string }> = ({
  currentColor,
}) => {
  return <FriendsIcon currentColor={currentColor} />;
};

export const ICustomGas: React.FC<{ currentColor: string }> = ({
  currentColor,
}) => {
  return <GasIcon currentColor={currentColor} />;
};

export const ICustomTriagleX2: React.FC<{ currentColor: string }> = ({
  currentColor,
}) => {
  return <TriangleX2 currentColor={currentColor} />;
};

export const ICustomFire: React.FC<{ currentColor: string }> = ({
  currentColor,
}) => {
  return <Fire currentColor={currentColor} />;
};

export const ICustomDiamond: React.FC<{
  className?: string;
  currentColor?: string;
}> = ({ className = ' ', currentColor }) => {
  return <DiamondIcon className={className} currentColor={currentColor} />;
};

export const IDocumentDuplicateIcon: React.FC<IconProps> = ({
  variant = 'solid',
  size = 'medium',
  color = 'black',
  className,
}) => {
  return variant === 'solid' ? (
    <SolidIcons.DocumentDuplicateIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
    />
  ) : (
    <OutlineIcons.DocumentDuplicateIcon
      className={`${className} ${sizes[size]} ${colors[color]}`}
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
  'arrow-up-on-square': IArrowUpOnSquare,
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
  eye: IEye,
  document: IDocument,
  'check-badge': ICheckBadge,
  'ellipsis-horizontal': IEllipsisHorizontal,
  plus: IPlus,
  pencil: IPencil,
  chevronright: IChevronRight,
  'book-open': IBookOpen,
  'square-2-stack': ISquare2Stack,
  'lock-closed': ILockClosed,
  idocumentduplicateIcon: IDocumentDuplicateIcon,
  arrowupright: IArrowUpRight,
  shoppingbag: IShoppingBag,
};

export type IconType = keyof typeof icons;
