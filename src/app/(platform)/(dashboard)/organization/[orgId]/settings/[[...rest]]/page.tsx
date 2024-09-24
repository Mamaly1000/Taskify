import { OrganizationProfile } from "@clerk/nextjs";
import React from "react";

const OrgSettingPage = () => {
  return (
    <div className="w-full max-w-full overflow-hidden ">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
          },
        }}
        afterLeaveOrganizationUrl="/select-org"
      />
    </div>
  );
};

export default OrgSettingPage;
