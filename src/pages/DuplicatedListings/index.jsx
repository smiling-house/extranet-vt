import React from "react";
import Layout from "../../components/Layout/index.js";

const DuplicatedListings = (props) => {
  const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props;

  return (
    <Layout
      pageTitle="Duplicated Listings"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div style={{ padding: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Duplicated Listings</h3>
        <div style={{ opacity: 0.8 }}>Blank page for now.</div>
      </div>
    </Layout>
  );
};

export default DuplicatedListings;
