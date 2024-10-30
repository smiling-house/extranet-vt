import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import PersonalizeLogoModel from "../../Models/PersonalizeLogoModel";

const Home = () => {
  const [flag, setflag] = useState(true);
  const handleCloseModel = () => {
    setflag(false);
  };
  var travelAgencyImage = JSON.parse(localStorage.getItem("travelAgency"));

  return (
    <>
      <section className="homepage_section_cst">
        <PageHeader />
        {flag && travelAgencyImage?.userImage == "" && (
          <PersonalizeLogoModel handleCloseModel={handleCloseModel} />
        )}
      </section>
    </>
  );
};
export default Home;
