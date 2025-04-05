import React from "react";
const PlatformInfo = () => (
  <div className="hero py-12">
    <div className="hero-content flex-col lg:flex-row gap-30">
      <img src="https://res.cloudinary.com/dpxoco8xb/image/upload/v1743746972/intro_ird3gp.png" />
      <div>
        <h1 className="text-5xl font-bold text-center">
          Spurti : A Platform for Change
        </h1>
        <p className="py-6 text-center">
          A decentralized, community-driven online ecosystem where community
          leaders, local organizations, tribes, and verified representatives
          from underserved regions can submit real-world challenges they
          face—such as child labor, educational issues, healthcare shortages,
          infrastructure deficiencies, sanitation problems, and more
        </p>
        <p className="text-center ">
          Global experts in various fields, along with NGOs, businesses, and
          volunteers, can collaborate to propose funding, offer advice and
          assistance, introduce technlogical innovations, recommend policies,
          develop infrastructure projects, or initiate grassroots solutions.
          This ensures that aid reaches those who need it most, effectively
          addressing real-world challenges in underserved regions.
        </p>
      </div>
    </div>
  </div>
);

export default PlatformInfo;
