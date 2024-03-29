import React from "react";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar />
      <main style={{ minHeight: "50vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
}
// Layout.defaultProps = {
//   title: "Ecommerce app -shop now",
//   description: "mern stack project",
//   keywords: "mern, react, node, mongodb",
//   author: "rahul",
// };

export default Layout;
