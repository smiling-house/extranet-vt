// Thin wrapper: VillasInStBarth PMs, rendered with the modern PartnersListView.
// Replaces the legacy PartnersBART/ page — same endpoint + params, no modal
// (the legacy Edit/Approve/Delete affordances were dead code, commented out).
import React from "react";
import PartnersListView from "../PartnersListView";
import { PATH_LISTINGS } from "../../Util/constants";

const PartnersBartV2 = (props) => (
  <PartnersListView
    {...props}
    title="BART PMs"
    subhead="VillasInStBarth channel property managers"
    endpoint="local/partners"
    drilldownPath={PATH_LISTINGS}
    apiParams={{
      provider: "VillasInStBarth",
      source: "VillasInStBarth",
    }}
    statusFilterKey="property_status_to_filter_bart_v2"
  />
);

export default PartnersBartV2;
