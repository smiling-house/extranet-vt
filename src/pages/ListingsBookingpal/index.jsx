import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { BsChevronDown } from "react-icons/bs";

import Layout from "../../components/Layout";
import LoadingBox from "../../components/LoadingBox";
import Paging from "../../components/Paging";
import constants from "../../Util/constants";
import { PATH_PARTNERS_BOOKINGPAL } from "../../Util/constants";
import ReservationDemo from "../PartnersBookingpal/ReservationDemo";

// Read-only view of a direct-BookingPal PM's listings. Data comes from VTHub
// (`/local/listings-bookingpal`), which reads `bookingpal_listings_test` in test
// mode (else the main `listings`). Reached from the BP PMs page count cells.
const PAGE_SIZE = constants.PAGING_LISTINGS_SIZE || 50;

const columns = [
  { name: "#", width: "60px" },
  { name: "Property ID", width: "120px" },
  { name: "Title", width: "320px" },
  { name: "Type", width: "150px" },
  { name: "Region", width: "150px" },
  { name: "Location", width: "200px" },
  { name: "Price", width: "120px" },
  { name: "Beds / Baths", width: "120px" },
  { name: "Status", width: "120px" },
  { name: "Updated at", width: "140px" },
  { name: "Reservation", width: "120px" },
];

const ListingsBookingpal = (props) => {
  const {
    agency,
    agent,
    token,
    screenSize,
    activeMenu,
    handleToggleMenu,
    setActiveMenu,
  } = props;

  const history = useHistory();
  const location = useLocation();

  const accountId =
    location?.state?.accountId || localStorage.getItem("bp_listings_accountId") || "";
  const status =
    location?.state?.status || localStorage.getItem("bp_listings_status") || "";
  let partner = null;
  try {
    partner = JSON.parse(localStorage.getItem("bp_listings_partner"));
  } catch (e) {
    partner = null;
  }

  const [listings, setListings] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [serialNumber, setSerialNumber] = useState(0);
  const [reserveListing, setReserveListing] = useState(null);

  const userRequest = axios.create({
    baseURL: constants.SHUB_URL,
    headers: { Authorization: constants.SHUB_TOKEN },
  });

  const getListings = async (pageNo = 0) => {
    if (!accountId) return;
    setIsLoading(true);
    try {
      const params = {
        accountId,
        limit: PAGE_SIZE,
        skip: pageNo * PAGE_SIZE,
      };
      if (status && status !== "") params.status = status;

      const response = await userRequest.get(`local/listings-bookingpal`, { params });
      setListings(response.data?.listings || []);
      setCount(parseInt(response.data?.count || 0));
    } catch (err) {
      console.log("error reading local/listings-bookingpal", err?.message);
      setListings([]);
      setCount(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getListings(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePage = (pageNo) => {
    setPageNumber(pageNo);
    setSerialNumber(pageNo * PAGE_SIZE);
    getListings(pageNo);
  };

  const fmtPrice = (l) => {
    const p = l?.data?.prices || {};
    if (p.basePrice == null || p.basePrice === "") return "-";
    return `${p.basePrice} ${p.currency || ""}`.trim();
  };

  return (
    <Layout
      pageTitle="BP Listings"
      agency={agency}
      agent={agent}
      token={token}
      screenSize={screenSize}
      activeMenu={activeMenu}
      handleToggleMenu={handleToggleMenu}
      setActiveMenu={setActiveMenu}
    >
      <div className="agencies-container">
        <LoadingBox visible={isLoading} />

        <div className="agencies-main-subtitle px-3 py-2">
          <span
            className="text-primary text-decoration-underline cst-cursor"
            onClick={() => history.push(PATH_PARTNERS_BOOKINGPAL)}
          >
            &laquo; Back to BP PMs
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          BookingPal listings for <strong>{partner?.pmName || accountId}</strong>
          {accountId ? ` (${accountId})` : ""}
          {status ? ` — ${status}` : ""} &nbsp; [{count}]
        </div>

        <Paging
          perPage={PAGE_SIZE}
          totalItems={count}
          currentPage={pageNumber}
          onChangePage={onChangePage}
        />

        <div className="table-responsive px-3">
          <table class="table">
            <thead style={{ backgroundColor: "#f9f9f7" }}>
              <tr>
                {columns.map((c, i) => (
                  <th key={i} scope="col" style={{ width: c.width }}>
                    {c.name} <BsChevronDown />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="px-4 p-3"><h4>{serialNumber + index + 1}</h4></td>
                  <td className="px-4 p-3"><h4>{item.id}</h4></td>
                  <td className="px-4 p-3"><h4>{item?.data?.title || ""}</h4></td>
                  <td className="px-4 p-3"><h4>{item?.data?.propertyType || ""}</h4></td>
                  <td className="px-4 p-3"><h4>{item?.xdata?.region || ""}</h4></td>
                  <td className="px-4 p-3">
                    <h4>
                      {[item?.data?.address?.city, item?.data?.address?.country]
                        .filter(Boolean)
                        .join(", ")}
                    </h4>
                  </td>
                  <td className="px-4 p-3"><h4>{fmtPrice(item)}</h4></td>
                  <td className="px-4 p-3">
                    <h4>
                      {(item?.data?.bedrooms ?? "-")} / {(item?.data?.bathrooms ?? "-")}
                    </h4>
                  </td>
                  <td className="px-4 p-3"><h4>{item?.xdata?.status || ""}</h4></td>
                  <td className="px-4 p-3">
                    <h4>
                      {item?.updatedAt
                        ? String(item.updatedAt).slice(0, 10)
                        : ""}
                    </h4>
                  </td>
                  <td className="px-4 p-3">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => setReserveListing(item)}>
                      Reserve
                    </button>
                  </td>
                </tr>
              ))}
              {(!listings || listings.length === 0) && !isLoading && (
                <tr>
                  <td className="px-4 p-3" colSpan={columns.length}>
                    <h4>No BookingPal listings found{accountId ? ` for ${accountId}` : ""}.</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {reserveListing && (
          <ReservationDemo listing={reserveListing} onClose={() => setReserveListing(null)} />
        )}
      </div>
    </Layout>
  );
};

export default ListingsBookingpal;
