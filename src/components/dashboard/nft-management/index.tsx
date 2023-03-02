import React from "react";
import { useTheme } from "next-themes";

// components
import * as DutchC from "./styles";

// icons
import * as Icons from "@/common/Icons";

const NFTManagement: React.FC = () => {
  const { theme } = useTheme();

  return (
    <DutchC.NFTManagementWrapper>
      <DutchC.NFTManagementContentWrapper></DutchC.NFTManagementContentWrapper>

      <DutchC.NFTManagementGuideWrapper>
        {/* information icon */}
        <DutchC.NFTManagementGuideInfoIconWrapper>
          <Icons.IInformationCircle
            variant="solid"
            size="large"
            color={theme === "light" ? "black" : "white"}
          />
        </DutchC.NFTManagementGuideInfoIconWrapper>

        <DutchC.NFTManagementGuideCard>
          <DutchC.NFTManagementGuideCardHeader>
            What is NFT Management?
          </DutchC.NFTManagementGuideCardHeader>

          <DutchC.NFTManagementGuideCardContent>
            The hub for managing and interacting with NFTs in your portfolio.
            You can view NFTs, create &apos;lists&apos;, manage
            &apos;collections&apos; or BANK0x.
          </DutchC.NFTManagementGuideCardContent>

          <DutchC.NFTManagementGuideCardFooter>
            <Icons.IPlayCircle variant="solid" size="medium" color="orange" />
            <span>How it works?</span>
          </DutchC.NFTManagementGuideCardFooter>
        </DutchC.NFTManagementGuideCard>

        <DutchC.NFTManagementGuideCard>
          <DutchC.NFTManagementGuideCardHeader>
            Why sync NFTs?
          </DutchC.NFTManagementGuideCardHeader>

          <DutchC.NFTManagementGuideCardContent>
            Uploads the NFTs tied to your wallet that are not necessarily
            present in your wallet currently. After succesfuly performing Sync
            NFTs you are able to use the variety of tools.
          </DutchC.NFTManagementGuideCardContent>

          <DutchC.NFTManagementGuideCardFooter>
            <span style={{ fontWeight: 700 }}>Sync NFTs</span>
          </DutchC.NFTManagementGuideCardFooter>
        </DutchC.NFTManagementGuideCard>
      </DutchC.NFTManagementGuideWrapper>
    </DutchC.NFTManagementWrapper>
  );
};

export default NFTManagement;
