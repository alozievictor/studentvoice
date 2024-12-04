import React from "react";
import Admin_Nav from "../../components/Admin_comp/Admin_Nav";
import Admin_Footer from "../../components/Admin_comp/Admin_Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full">
      <Admin_Nav />
      <section className="w-[97%] lg:w-[90%] mx-auto mb-5">
        {children}
      </section>
      <Admin_Footer />
    </div>
  );
};

export default Layout;
