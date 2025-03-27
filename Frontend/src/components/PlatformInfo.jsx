// PlatformInfo.js
import React from "react";
const PlatformInfo = () => (
  <section className="p-10 flex flex-col md:flex-row items-center gap-44">
    <div className="flex justify-end md:w-2/5 mt-4 md:mt-0">
      <img
        src="./public/intro.png"
        alt="Smiling child"
        className="rounded-lg"
      />
    </div>
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold">Spurti : A Platform for Change </h2>
      <p className="mt-4">
        A decentralized, community-driven online ecosystem where community
        leaders, local organizations, tribes, and verified representatives from
        underserved regions can submit real-world challenges they face—such as
        child labor, educational issues, healthcare shortages, infrastructure
        deficiencies, sanitation problems, and more
      </p>
      <p className="mt-4">
        Global experts in various fields, along with NGOs, businesses, and
        volunteers, can collaborate to propose funding, offer advice and
        assistance, introduce technological innovations, recommend policies,
        develop infrastructure projects, or initiate grassroots solutions. This
        ensures that aid reaches those who need it most, effectively addressing
        real-world challenges in underserved regions.
      </p>
    </div>
  </section>
);

export default PlatformInfo;
