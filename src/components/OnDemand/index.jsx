// -----------------------------------------------------------------------
// Reusable "On Demand" badge + "Price on request" chip (twin of VT-FE).
// One consistent treatment for on-demand / QOD listings wherever a price
// would show — an amber "On Demand" pill + a "Price on request" chip that
// replaces the price (never a blank, never a number).
// -----------------------------------------------------------------------
import React from "react";
import "./OnDemand.scss";

export const OnDemandBadge = ({ className = "", label = "On Demand" }) => (
  <span className={`od-badge ${className}`}>{label}</span>
);

export const PriceOnRequest = ({ className = "", label = "Price on request" }) => (
  <span className={`od-price-chip ${className}`}>{label}</span>
);

export default OnDemandBadge;
