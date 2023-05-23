import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  > div {
    width: 100%;
    overflow: hidden;
  }
`;
const StyledLogo = styled.div<{ rtl?: boolean }>`
  width: 35px;
  min-width: 35px;
  height: 35px;
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-size: 24px;
  font-weight: 700;
  background-color: #0a6ddc;
  background: #0a6ddc;
  ${({ rtl }) =>
    rtl
      ? `
      margin-left: 10px;
      margin-right: 5px;
      `
      : `
      margin-right: 10px;
      margin-left: 5px;
      `}
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  ...rest
}) => {
  const rtl = false;
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <StyledLogo rtl={rtl}>V</StyledLogo>
        <Text fontSize="md" pl="10px">
          {"Vaku"}
        </Text>
      </div>
    </StyledSidebarHeader>
  );
};
