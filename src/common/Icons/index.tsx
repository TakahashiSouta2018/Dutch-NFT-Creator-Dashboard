import React from "react";
import {
  MagnifyingGlassIcon as SolidMagnifyingGlass,
  BellIcon as SolidBell,
  WalletIcon as SolidWallet,
  UserIcon as SolidUser,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon as OutlineMagnifyingGlass,
  BellIcon as OutlineBell,
  WalletIcon as OutlineWallet,
  UserIcon as OutlineUser,
} from "@heroicons/react/24/outline";

// type
import { IconVariants } from "@/types/icon";

type IconProps = IconVariants;

const sizes = {
  small: "w-3 h-3",
  medium: "w-4 h-4",
  large: "w-5 h-5",
};

const colors = {
  black: "text-black/70",
  gray: "text-black/30",
  white: "text-white",
  orange: "text-primary",
};

export const ISearch: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return <SolidMagnifyingGlass className={`${sizes[size]} ${colors[color]}`} />;
};

export const IBell: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidBell className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineBell className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IWallet: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidWallet className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineWallet className={`${sizes[size]} ${colors[color]}`} />
  );
};

export const IUser: React.FC<IconProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return variant === "solid" ? (
    <SolidUser className={`${sizes[size]} ${colors[color]}`} />
  ) : (
    <OutlineUser className={`${sizes[size]} ${colors[color]}`} />
  );
};
