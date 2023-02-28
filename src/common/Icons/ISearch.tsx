import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

// type
import { IconVariants } from "@/types/icon";

type ISearchProps = IconVariants;

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

const ISearch: React.FC<ISearchProps> = ({
  variant = "solid",
  size = "medium",
  color = "black",
}) => {
  return <MagnifyingGlassIcon className={`${sizes[size]} ${colors[color]}`} />;
};

export default ISearch;
