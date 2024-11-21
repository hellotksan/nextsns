import React from "react";
import * as RootComponents from "@/components/layouts/rootComponents/index";
import Footer from "@/components/layouts/footer/Footer";

const RootPage: React.FC = () => {
  return (
    <>
      <RootComponents.HeroSection />
      <RootComponents.TechStacks />
      <Footer />
    </>
  );
};

export default RootPage;
