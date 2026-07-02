// Thin wrapper: InvenioHomes PMs, rendered with the modern PartnersListView.
// Replaces the legacy PartnersINVENIO/ page — same endpoint + params, no modal.
import React from "react";
import PartnersListView from "../PartnersListView";
import { PATH_LISTINGS } from "../../Util/constants";

const PartnersInvenioV2 = (props) => (
  <PartnersListView
    {...props}
    title="INVENIO PMs"
    subhead="InvenioHomes channel property managers"
    endpoint="local/partners"
    drilldownPath={PATH_LISTINGS}
    apiParams={{
      provider: "InvenioHomes",
      source: "InvenioHomes",
    }}
    statusFilterKey="property_status_to_filter_invenio_v2"
  />
);

export default PartnersInvenioV2;
