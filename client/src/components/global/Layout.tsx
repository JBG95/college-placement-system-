import React, { ReactNode } from "react";
// import { useRecoilValue } from "recoil";
// import { userDetailsAtom, isAuthenticatedAtom } from "../../recoil/atom";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  //   const user = useRecoilValue(userDetailsAtom);
  //   const auth = useRecoilValue(isAuthenticatedAtom);
  //   useEffect(() => {
  //     if (auth === false || user === null) {
  //       window.location.pathname = "/";
  //       return;
  //     }
  //   }, [auth, user]);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
