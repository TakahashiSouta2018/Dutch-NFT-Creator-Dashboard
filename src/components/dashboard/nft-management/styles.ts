import styled from "styled-components";

// types

// components
export const NFTManagementWrapper = styled.div.attrs({
  className: "relative flex px-6 py-4",
})``;

// --- Main Content
export const NFTManagementContentWrapper = styled.div.attrs({
  className: "flex grow",
})``;

// --- Guide
export const NFTManagementGuideWrapper = styled.div.attrs({
  className: "relative flex flex-col gap-8 py-9 ml-6 w-1/6",
})``;

export const NFTManagementGuideCard = styled.div.attrs({
  className: "flex flex-col space-y-2 py-2",
})``;

export const NFTManagementGuideCardHeader = styled.h1.attrs({
  className: "text-sm font-medium whitespace-nowrap text-black dark:text-white",
})``;

export const NFTManagementGuideCardContent = styled.p.attrs({
  className: "text-sm font-normal text-black/70 dark:text-white/70",
})``;

export const NFTManagementGuideCardFooter = styled.div.attrs({
  className:
    "inline-flex items-center space-x-1 text-sm text-primary-orange cursor-pointer dark:text-dark-orange",
})``;

export const NFTManagementGuideInfoIconWrapper = styled.div.attrs({
  className: "absolute top-0 right-0 cursor-pointer",
})``;
