import React from "react";
import * as Root from "@/components/layouts/root/index";
import Footer from "@/components/layouts/footer/Footer";

const RootPage: React.FC = () => {
  return (
    <>
      <Root.HeroSection />
      <Root.TechStacks />
      <Footer />
    </>
  );
};

export default RootPage;
