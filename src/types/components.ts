/**
 * Button
 */
export type ButtonVariants = {
  variant?: "solid" | "outline" | "text";
  size?: "small" | "large";
};

export type IconButtonVariants = {};

/**
 * Icon
 */
export type IconVariants = {
  variant?: "solid" | "outline";
  size?: "small" | "medium" | "large";
  color?: "black" | "gray" | "white" | "orange" | "dark-gray";
};

/**
 * Input
 */
// --- Text Input

// --- Search Input
export type SearchInputVariant = {
  isShortCut?: boolean;
};

/**
 * Badge
 */
export type BadgeVariants = "default" | "dot" | "icon";

/**
 * Link
 */
export type LinkSizes = "small" | "large";

/**
 * Dropdown
 */
export type DropdownPositionVariants = "TL" | "TR" | "BL" | "BR";
