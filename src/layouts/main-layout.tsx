import React from "react";

interface Props {
  children: React.ReactNode;
}
const MainLayout = ({ children }: Props) => {
  return <div className="h-screen">{children}</div>;
};

export default MainLayout;
