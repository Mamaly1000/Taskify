import { OrganizationList } from "@clerk/nextjs";
import React from "react";

const SelectOrgPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
};

export default SelectOrgPage;
