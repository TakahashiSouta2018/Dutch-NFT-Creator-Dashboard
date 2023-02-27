import React from "react";
import styled from "styled-components";

/**
 * Test app wrapper
 */
export const AppWrapper = styled.h1.attrs({
  className: "text-3xl font-satoshi font-bold underline",
})``;

export default function Home() {
  return <AppWrapper>Hello world!</AppWrapper>;
}
