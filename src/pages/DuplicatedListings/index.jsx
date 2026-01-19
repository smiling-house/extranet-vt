import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { FiCheckCircle, FiCopy, FiSlash, FiXCircle } from "react-icons/fi";

import Layout from "../../components/Layout/index.js";
import LoadingBox from "../../components/LoadingBox";
import Paging from "../../components/Paging";
import constants from "../../Util/constants";

import RebuildImageHashesPopup from "./RebuildImageHashesPopup";

import "./DuplicatedListings.scss";

const DISABLE_PROPERTY_ENDPOINT = "/disable_property";
const BATCH_DISABLE_PROPERTY_ENDPOINT = "/listings_batchdisable";

const DuplicatedListings = (props) => {
  const { token, agency, agent, screenSize, activeMenu, handleToggleMenu, setActiveMenu } = props;

  const [toast, setToast] = useState({ visible: false, message: "" });
  const [toastTimerId, setToastTimerId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [duplicatedListings, setDuplicatedListings] = useState(null);
  const [isRebuildPopupOpen, setIsRebuildPopupOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("titleAddress");
  const [skipTitleAddress, setSkipTitleAddress] = useState(0);
  const [skipImages, setSkipImages] = useState(0);
  const [limit] = useState(20);

  const [selectedIdsTitleAddress, setSelectedIdsTitleAddress] = useState(() => new Set());
  const [selectedIdsImages, setSelectedIdsImages] = useState(() => new Set());
  const [isBatchDisabling, setIsBatchDisabling] = useState(false);

  const [disablingIds, setDisablingIds] = useState(() => new Set());
  const [disabledIds, setDisabledIds] = useState(() => new Set());

  const authToken = token || "test-token";

  const api = useMemo(() => {
    return axios.create({
      baseURL: constants.SHUB_URL,
      headers: { "x-api-key": constants.X_API_KEY },
    });
  }, [authToken]);

  const showToast = (message) => {
    if (toastTimerId) {
      clearTimeout(toastTimerId);
    }
    setToast({ visible: true, message });
    const timerId = setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 2000);
    setToastTimerId(timerId);
  };

  const effectiveSkip = activeTab === "images" ? skipImages : skipTitleAddress;

  const selectedIds = activeTab === "images" ? selectedIdsImages : selectedIdsTitleAddress;
  const selectedCount = selectedIds.size;

  const loadDuplicates = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await api.get("/get_duplicated_listings", {
        params: {
          skip: effectiveSkip,
          limit,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setDuplicatedListings(res.data);
      return res.data;
    } catch (err) {
      setLoadError(err?.message || "Failed to load duplicated listings");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await loadDuplicates();
        if (cancelled) return;
        if (data) setDuplicatedListings(data);
      } catch (err) {
        if (cancelled) return;
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [api, effectiveSkip, limit]);

  const titleAddressTotalCount = duplicatedListings?.totalCount || 0;
  const titleAddressGroups = Array.isArray(duplicatedListings?.groups) ? duplicatedListings.groups : [];

  const imageTotalCount = duplicatedListings?.originalHashTotalCount || 0;
  const imageGroups = Array.isArray(duplicatedListings?.originalHashGroups)
    ? duplicatedListings.originalHashGroups
    : [];

  const totalCount = activeTab === "images" ? imageTotalCount : titleAddressTotalCount;
  const groups = activeTab === "images" ? imageGroups : titleAddressGroups;
  const currentPage = Math.floor(effectiveSkip / (limit || 1));

  const showingFrom = totalCount > 0 ? effectiveSkip + 1 : 0;
  const showingTo = Math.min(effectiveSkip + limit, totalCount);

  const onChangePage = (pageNumber) => {
    const nextSkip = (pageNumber || 0) * limit;
    if (activeTab === "images") {
      setSkipImages(nextSkip);
    } else {
      setSkipTitleAddress(nextSkip);
    }
  };

  const onChangeTab = (nextTab) => {
    setActiveTab(nextTab);
  };

  const toggleSelected = (listingId) => {
    if (!listingId) return;

    const setSelected = activeTab === "images" ? setSelectedIdsImages : setSelectedIdsTitleAddress;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(listingId)) {
        next.delete(listingId);
      } else {
        next.add(listingId);
      }
      return next;
    });
  };

  const clearSelected = () => {
    if (activeTab === "images") {
      setSelectedIdsImages(new Set());
    } else {
      setSelectedIdsTitleAddress(new Set());
    }
  };

  const disableSelected = async () => {
    const ids = Array.from(selectedIds);
    if (!ids.length || isBatchDisabling) return;

    const confirmed = await swal({
      title: "Disable selected properties?",
      text: `This will disable ${ids.length} listing(s).`,
      icon: "warning",
      buttons: ["Cancel", "Disable"],
      dangerMode: true,
    });

    if (!confirmed) return;

    setIsBatchDisabling(true);
    try {
      await api.post(BATCH_DISABLE_PROPERTY_ENDPOINT, {
        ids,
        listingIds: ids,
      });

      setDisabledIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.add(id));
        return next;
      });

      clearSelected();

      swal({
        icon: "success",
        title: "Disabled",
        text: `Disabled ${ids.length} listing(s).`,
      });

      const data = await loadDuplicates();
      if (data?.success) {
        showToast("List refreshed");
      }
    } catch (err) {
      swal({
        icon: "error",
        title: "Batch disable failed",
        text: err?.message || "Failed to disable selected listings.",
      });
    } finally {
      setIsBatchDisabling(false);
    }
  };

  const onCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      showToast(`Listing id copied to clipboard: ${text}`);
    } catch (e) {
      swal({
        icon: "error",
        title: "Copy failed",
        text: "Could not copy to clipboard.",
      });
    }
  };

  const onRefreshDuplicates = async () => {
    const data = await loadDuplicates();
    if (data?.success) {
      showToast("Duplicate list refreshed");
    }
  };

  const onRebuildImageHashes = async () => {
    setIsRebuildPopupOpen(true);
  };

  const disableProperty = async (listing) => {
    const confirmed = await swal({
      title: "Disable property?",
      text: `This will disable ${listing?.id}.`,
      icon: "warning",
      buttons: ["Cancel", "Disable"],
      dangerMode: true,
    });

    if (!confirmed) return;

    setDisablingIds((prev) => {
      const next = new Set(prev);
      next.add(listing.id);
      return next;
    });

    try {
      await api.post(DISABLE_PROPERTY_ENDPOINT, {
        id: listing.id,
        accountId: listing.accountId,
        source: listing.source,
      });

      setDisabledIds((prev) => {
        const next = new Set(prev);
        next.add(listing.id);
        return next;
      });

      swal({
        icon: "success",
        title: "Disabled",
        text: `Property ${listing.id} has been disabled.`,
      });
    } catch (err) {
      swal({
        icon: "error",
        title: "Disable failed",
        text: err?.message || "Failed to disable property.",
      });
    } finally {
      setDisablingIds((prev) => {
        const next = new Set(prev);
        next.delete(listing.id);
        return next;
      });
    }
  };

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
      <div className="duplicated-listings-container">
        <div style={{ position: "relative" }}>
          {toast.visible && (
            <div className="flash-toast" role="status" aria-live="polite">
              {toast.message}
            </div>
          )}
          <LoadingBox
            visible={isLoading}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "none",
              top: 0,
              left: 0,
              padding: 0,
            }}
          />

          <div className="page-intro">
            <div className="intro-header">
              <FiCopy size={32} className="intro-icon" />
              <div style={{ minWidth: 0 }}>
                <h2>Duplicated Listings</h2>
                <p>Review duplicate groups and disable listings that should not be active.</p>
              </div>
            </div>
            <div className="intro-meta">
              <div className="meta-pill">
                {activeTab === "images" ? "Image duplicates" : "Title & address duplicates"}: Showing {showingFrom}–
                {showingTo} of {totalCount}
              </div>

              <div className="intro-actions">
                <button
                  type="button"
                  className="action-btn action-btn-secondary"
                  onClick={onRefreshDuplicates}
                  disabled={isLoading}
                  title="Refresh duplicate list"
                >
                  Refresh
                </button>

                <button
                  type="button"
                  className="action-btn action-btn-primary"
                  onClick={onRebuildImageHashes}
                  disabled={isRebuildPopupOpen}
                  title="Rebuild image hashes"
                >
                  Rebuild Image Hashes
                </button>
              </div>
            </div>
          </div>

          <RebuildImageHashesPopup
            open={isRebuildPopupOpen}
            onClose={() => setIsRebuildPopupOpen(false)}
            token={authToken}
            onToast={showToast}
          />

          {loadError && <div className="error-box">{loadError}</div>}

          <div className="groups-card">
            <div className="groups-header">
              <div className="groups-header-left">
                <h5>Duplicate Groups</h5>
                <div className="duplicates-tabs" role="tablist" aria-label="Duplicate type">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "titleAddress"}
                    className={`tab-btn ${activeTab === "titleAddress" ? "active" : ""}`}
                    onClick={() => onChangeTab("titleAddress")}
                    disabled={isLoading}
                  >
                    Title & Address ({titleAddressTotalCount})
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "images"}
                    className={`tab-btn ${activeTab === "images" ? "active" : ""}`}
                    onClick={() => onChangeTab("images")}
                    disabled={isLoading}
                  >
                    Image ({imageTotalCount})
                  </button>
                </div>
              </div>
              <div className="paging-wrap">
                <button
                  type="button"
                  className="batch-disable-btn"
                  onClick={disableSelected}
                  disabled={selectedCount === 0 || isLoading || isBatchDisabling}
                  title={selectedCount === 0 ? "Select one or more listings" : "Disable selected listings"}
                >
                  <FiSlash style={{ marginRight: 8 }} />
                  {isBatchDisabling ? "Disabling..." : "Disable selected"}
                  {selectedCount ? <span className="batch-disable-count">{selectedCount}</span> : null}
                </button>

                {totalCount > limit && (
                  <Paging
                    perPage={limit}
                    totalItems={totalCount}
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                  />
                )}
              </div>
            </div>

            <div className="groups-body">
              {!isLoading && groups.length === 0 && (
                <div className="empty-state">
                  {activeTab === "images" ? "No image duplicates found." : "No title/address duplicates found."}
                </div>
              )}

              {groups.map((group, groupIndex) => {
                const first = group?.[0] || {};
                const title = first.title || "Untitled";
                const addressLine = first.fullAddress || "";
                const badgeAccount = first.accountId ? `Account: ${first.accountId}` : null;
                const badgeRegion = [first.city, first.country].filter(Boolean).join(", ");

                return (
                  <div className="group-row" key={`${first.id || "group"}-${groupIndex}`}>
                    <div className="group-row-header">
                      <div className="group-title">
                        <div className="main">{title}</div>
                        <div className="sub">{addressLine}</div>
                      </div>
                      <div className="group-badges">
                        <div className="badge">{group.length} listings</div>
                        {badgeAccount && <div className="badge badge-muted">{badgeAccount}</div>}
                        {badgeRegion && <div className="badge badge-muted">{badgeRegion}</div>}
                      </div>
                    </div>

                    <div className="properties-strip">
                      {group.map((listing) => {
                        const isDisabling = disablingIds.has(listing.id);
                        const isDisabled = disabledIds.has(listing.id);
                        const pmName = listing?.pmName;
                        const isSelected = selectedIds.has(listing.id);

                        return (
                          <div
                            className={`property-card ${isSelected ? "selected" : ""}`}
                            key={listing.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => toggleSelected(listing.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                toggleSelected(listing.id);
                              }
                            }}
                            aria-pressed={isSelected}
                            title={isSelected ? "Click to unselect" : "Click to select"}
                          >
                            {isSelected && (
                              <div className="selected-indicator" aria-hidden="true">
                                <FiCheckCircle size={18} />
                              </div>
                            )}
                            {activeTab === "images" && listing?.imageUrl && (
                              <div className="prop-thumb" title="Listing image">
                                <img
                                  src={listing.imageUrl}
                                  alt={listing.title ? `${listing.title} thumbnail` : "Listing thumbnail"}
                                  loading="lazy"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                            <div className="property-header">
                              <div style={{ minWidth: 0 }}>
                                <div className="prop-title">{listing.title || "Untitled"}</div>
                              </div>
                            </div>

                            <div className="prop-meta">
                              <div className="status-row">
                                <div
                                  className={`status-pill ${
                                    listing?.isListed === true
                                      ? "true"
                                      : listing?.isListed === false
                                        ? "false"
                                        : "unknown"
                                  }`}
                                >
                                  {listing?.isListed === false ? (
                                    <FiXCircle size={16} />
                                  ) : (
                                    <FiCheckCircle size={16} />
                                  )}
                                  <span>
                                    Listed: {listing?.isListed === true ? "Yes" : listing?.isListed === false ? "No" : "Unknown"}
                                  </span>
                                </div>

                                <div
                                  className={`status-pill ${
                                    listing?.isActive === true
                                      ? "true"
                                      : listing?.isActive === false
                                        ? "false"
                                        : "unknown"
                                  }`}
                                >
                                  {listing?.isActive === false ? (
                                    <FiXCircle size={16} />
                                  ) : (
                                    <FiCheckCircle size={16} />
                                  )}
                                  <span>
                                    Active: {listing?.isActive === true ? "Yes" : listing?.isActive === false ? "No" : "Unknown"}
                                  </span>
                                </div>
                              </div>
                              <div className="line"><strong>Id:</strong> {listing.id}</div>
                              <div className="line"><strong>Source:</strong> {listing.source}</div>
                              {listing?.channelSource && (
                                <div className="line"><strong>Channel Source:</strong> {listing.channelSource}</div>
                              )}
                              {pmName && <div className="line"><strong>PM Name:</strong> {pmName}</div>}
                              <div className="line"><strong>Account:</strong> {listing.accountId}</div>
                              <div className="line"><strong>Region:</strong> {listing.region || "-"}</div>
                              <div className="line address">{listing.fullAddress}</div>
                            </div>

                            <div className="prop-actions">
                              <button
                                type="button"
                                className={`btn ${isDisabled ? "btn-disabled" : "btn-disable"}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  disableProperty(listing);
                                }}
                                disabled={isDisabled || isDisabling}
                                title={isDisabled ? "Already disabled" : "Disable this property"}
                              >
                                <FiSlash style={{ marginRight: 6 }} />
                                {isDisabling ? "Disabling..." : isDisabled ? "Disabled" : "Disable"}
                              </button>

                              <button
                                type="button"
                                className="btn btn-copy"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onCopy(listing.id);
                                }}
                              >
                                <FiCopy style={{ marginRight: 6 }} />
                                Copy ID
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DuplicatedListings;
