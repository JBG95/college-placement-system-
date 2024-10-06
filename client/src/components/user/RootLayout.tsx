import React, { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom, userDetailsAtom } from "../../recoil/atoms";
import Navbar from "../global/AuthNavbar";
import Sidebar from "../global/AuthSidebar";

interface LayoutProps {
  children: ReactNode;
}
const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const user = useRecoilValue(userDetailsAtom);
  const auth = useRecoilValue(isAuthenticatedAtom);
  useEffect(() => {
    if (auth === false || user === null) {
      window.location.pathname = "/";
      return;
    }
  }, [auth, user]);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className=" p-2 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
