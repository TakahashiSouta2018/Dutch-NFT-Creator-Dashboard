import React, { useState } from "react";

// components
import * as DutchC from "./styles";

// icons
import { IBell, IWallet, IUser } from "../Icons";

const icons = {
  bell: IBell,
  wallet: IWallet,
  user: IUser,
};

interface IconButtonProps {
  icon: "bell" | "wallet" | "user";
}

const IconButton: React.FC<IconButtonProps> = ({ icon }) => {
  const [isPressed, setIsPressed] = useState(false);
  const Icon = icons[icon];

  return (
    <DutchC.IconButtonWrapper
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <Icon
        variant={isPressed ? "outlined" : "solid"}
        size="large"
        color={isPressed ? "white" : "black"}
      />
    </DutchC.IconButtonWrapper>
  );
};

export default IconButton;
