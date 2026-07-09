import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePickerArrival from "../../components/Forms/Fields/DatePickerArrival/DatePickerArrival";
import DatePickerDeparture from "../../components/Forms/Fields/DatePickerDeparture/DatePickerDeparture";
import pageBg from "../../assets/bk_pool.png";
import pagingLine from "../../assets/icons/paging-line.png";
import searchLogo from "../../assets/icons/search.png";
import Button from "../../components/Buttons/Button/Button";
import PageHeader from "../../components/PageHeader";
import * as propertyActions from "../../store/redux/Property/actions";
import constants from "../../Util/constants";
import LoadingBox from "../../components/LoadingBox";
import Datatable from "../../components/Datatable";
// import { data } from "./data";

import "./Reservations.scss";
import Paging from "../../components/Paging";
import AuthService from "../../services/auth.service";
import axios from "axios";
import moment from "moment/moment";
import { BsChevronDown } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";

const Reservations = (props) => {
  const [seachInpputes, setseachInpputes] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.property.isLoading);
  const reservations = useSelector((state) => state.property.reservations);
  const [data, setData] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);
  const doSearch = (pageNumber) => {
    //console.log("loading page ", pageNumber);
    dispatch(propertyActions.loadProperties(pageNumber));
  };

  const onPrevPage = () => {
    const pn = pageNumber - 1;
    setPageNumber(pn);
    doSearch(pn);
  };

  const onNextPage = () => {
    const pn = pageNumber + 1;
    setPageNumber(pn);
    doSearch(pn);
  };

  const onGotoPage = (page) => {
    setPageNumber(page);
    doSearch(page);
  };

  let clientPagingFrom = 1 + pageNumber * constants.PAGING_CLIENT_SIZE;
  let clientPagingTo = (pageNumber + 1) * constants.PAGING_CLIENT_SIZE;

  const onChangePage = (pageNumber) => {
    console.log("page=", pageNumber);
    setPageNumber(pageNumber);
    clientPagingFrom = 1 + pageNumber * constants.PAGING_CLIENT_SIZE;
    clientPagingTo = (pageNumber + 1) * constants.PAGING_CLIENT_SIZE;
    doSearch(pageNumber);
  };

  useEffect(() => {
    AuthService.GetReservation(seachInpputes)
      .then((response) => {
        setData(response.reservations);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const generatePaginationLinks = (currentPage, totalPages) => {
    let links = [];

    // Link to previous page
    if (currentPage > 1) {
      links.push(
        <div
          key={-1}
          className="reservations-paging-prev-next"
          onClick={onPrevPage}
        >
          Prev
        </div>
      );
    }

    // Link to previous page
    if (currentPage > 3) {
      links.push(
        <div
          key={-2}
          className="reservations-paging-prev-next"
          onClick={() => onGotoPage(0)}
        >
          1
        </div>
      );
      links.push(<div key={-3}>. . .</div>);
    }

    // Links to plus/minus 3 pages from current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      if (i === currentPage) {
        links.push(
          <div key={i} className="reservations-paging-number-selected">
            {i}
          </div>
        );
      } else {
        links.push(
          <div
            key={i}
            className="reservations-paging-number"
            onClick={() => onGotoPage(i - 1)}
          >
            {i}
          </div>
        );
      }
    }

    // Link to next page
    if (currentPage < totalPages) {
      links.push(
        <div
          key={-4}
          className="reservations-paging-prev-next"
          onClick={onNextPage}
        >
          Next
        </div>
      );
    }

    return links;
  };

  const renderPaging = () => {
    const pageSize = constants.PAGING_PAGE_SIZE;
    const pageCount = Math.ceil(reservations.count / pageSize);

    const paginationLinks = generatePaginationLinks(pageNumber + 1, pageCount);

    if (paginationLinks.length < 1) {
      return (
        <div className="pt-4 pb-3 px-5">
          <h1>Reservsations</h1>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="reservations-main-title">Reservations</div>
        <div className="reservations-paging">
          <img src={pagingLine} alt="" style={{ marginRight: "15px" }} />
          {paginationLinks}
        </div>
      </div>
    );
  };

  const handleReservationSearch = (name, value) => {
    setseachInpputes(value);
  };
  const refreshReservations = () => {
    AuthService.GetReservation(seachInpputes)
      .then((response) => {
        setData(response.reservations);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handlSearchClick = () => {
    refreshReservations();
  };

  // What the backend did about the guest's money when cancelling — surfaced to
  // the agent. Mirrors VT-FE's FLYWIRE_ACTION_MESSAGES so the extranet reports
  // the refund/hold outcome exactly like VT-FE does.
  const FLYWIRE_ACTION_MESSAGES = {
    hold_released: "The guest's card authorization hold was released.",
    cancel_failed:
      "The pre-auth hold could NOT be released automatically — admins were emailed to release it in the Flywire dashboard (it auto-expires after 7 days regardless).",
    refunded: "A full refund was issued to the guest's card automatically.",
    refund_manual_required:
      "REFUND REQUIRED: the guest's card was charged — admins were emailed to issue the refund in the Flywire dashboard.",
    refund_failed:
      "Automatic refund FAILED — admins were emailed to refund manually in the Flywire dashboard.",
    error:
      "Payment handling errored — check with the admins that the charge/hold was resolved.",
  };

  // Only offer Cancel for live reservations (not already declined/cancelled).
  const isCancellable = (status) => {
    const st = String(status || "").toLowerCase();
    return st === "approved" || st === "pending" || st === "confirmed";
  };

  // Cancel a reservation of ANY PMS source, mirroring VT-FE's
  // declineSingleReservation: cancel on the correct channel first (HW / BP /
  // RU-G / legacy), THEN decline the reservation-of-record (which runs the
  // Flywire refund/hold-release). A channel failure THROWS — never leave the
  // record declined while the channel stays booked.
  const onCancelReservation = async (iteam) => {
    const r = iteam;
    const reservationID = r?.reservationID;
    if (!reservationID) return;

    const pid = typeof r?.propertyId === "string" ? r.propertyId : "";
    const isRUApiProperty = pid.startsWith("RU-") || pid.startsWith("G-");
    const isHostawayApiProperty = pid.startsWith("HW-");
    const isBookingpalProperty = pid.startsWith("BP-");
    const isApproved = String(r?.status || "").toLowerCase() === "approved";
    const wasCharged = r?.payment_type === "instant" && r?.flywireReference;

    const confirmed = window.confirm(
      wasCharged
        ? "Cancel this reservation? The guest's card WAS CHARGED for this instant booking — cancelling triggers a full refund to the guest."
        : "Cancel this reservation? It will be cancelled on the channel."
    );
    if (!confirmed) return;

    setCancelingId(reservationID);
    try {
      // 1) Cancel/decline on channel when required.
      if (isHostawayApiProperty) {
        // Hostaway: only cancel on channel if the reservation was approved.
        if (isApproved) {
          const partnerReservationID = r?.partnerReservationID;
          if (!partnerReservationID) {
            throw new Error("Missing partnerReservationID for Hostaway cancellation.");
          }
          const cancelResp = await axios.put(
            `${constants.SHUB_URL}/hostaway-cancel-reservation`,
            {
              propertyId: pid, // hub resolves accountId from this
              reservationId: Number(partnerReservationID),
              cancelledBy: "host",
            },
            { headers: { "x-api-key": constants.X_API_KEY } }
          );
          if (cancelResp?.data?.success !== true) {
            throw new Error(cancelResp?.data?.error || "Failed to cancel reservation on Hostaway.");
          }
        }
      } else if (isBookingpalProperty) {
        // BookingPal: only cancel on channel if approved (the BP-side
        // reservation + calendar block exist then). Same controller
        // (cancelReservation) VT-FE's /bookingpal-cancel-reservation uses —
        // cancels on channel, marks stored rows cancelled, frees the calendar.
        if (isApproved) {
          if (!r?.bpConfirmationCode) {
            throw new Error("Missing BookingPal confirmation code for cancellation.");
          }
          const cancelResp = await AuthService.bpCancelReservation({
            confirmation_code: String(r.bpConfirmationCode),
            confirmation_id: r?.bpConfirmationId ? String(r.bpConfirmationId) : "",
          });
          const cancelData = cancelResp?.data;
          if (cancelData && cancelData.success === false) {
            throw new Error(cancelData?.error || "Failed to cancel reservation on BookingPal.");
          }
        }
      } else if (isRUApiProperty) {
        // RU / group: only cancel on channel if approved.
        if (isApproved) {
          const partnerReservationID = r?.partnerReservationID;
          if (!partnerReservationID) {
            throw new Error("Missing partnerReservationID for RU cancellation.");
          }
          const cancelResp = await axios.post(
            `${constants.SHUB_URL}/ru-cancelreservation`,
            {
              partnerReservationID: String(partnerReservationID),
              reservationId: String(partnerReservationID),
            },
            { headers: { "x-api-key": constants.X_API_KEY } }
          );
          const cancelData = cancelResp?.data;
          const cancelOk = cancelData?.status === true || cancelData?.success === true;
          if (!cancelOk) {
            throw new Error(cancelData?.message || "Failed to cancel reservation on RU channel.");
          }
        }
      } else {
        // Legacy channel (Guesty / direct) — mirrors VT-FE's /reserve-cancel.
        const data = JSON.stringify({
          client: {
            firstName: r?.guestFirstName,
            lastName: r?.guestLastName,
            phone: r?.guestPhoneNumbers,
            email: r?.guestEmail,
          },
          dateFrom: moment(r?.startDate).format("MM.DD.YYYY"),
          dateTo: moment(r?.endDate).format("MM.DD.YYYY"),
          currency: r?.currency,
          adults: r?.adults,
          children: r?.children,
          resChannel: "VT",
          reservationId: "Villatracker_" + r?.reservationID,
          ResStatus: "Cancel",
        });
        const channelResp = await axios.request({
          method: "put",
          maxBodyLength: Infinity,
          url: constants.SHUB_URL + "/reserve-cancel/" + r?.propertyId,
          headers: {
            Authorization:
              "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c",
            "Account-Id": "640625ea0620e40031b8597d",
            "Content-Type": "application/json",
          },
          data,
        });
        if (!channelResp?.data?.success) {
          throw new Error(channelResp?.data?.error || "Failed to cancel reservation on channel!");
        }
      }

      // 2) Decline the reservation-of-record — the backend releases/refunds the
      //    Flywire payment as part of this call and reports the outcome back.
      const responseUpdate = await AuthService.bpDeclineReservation(
        reservationID,
        "declined"
      );
      if (!responseUpdate?.success) {
        throw new Error("Failed to cancel reservation.");
      }
      const actionMsg = FLYWIRE_ACTION_MESSAGES[responseUpdate?.flywireAction];
      window.alert(
        actionMsg
          ? `Reservation cancelled. ${actionMsg}`
          : "Reservation cancelled."
      );
      refreshReservations();
    } catch (err) {
      console.log("cancel error:", err);
      window.alert(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to cancel reservation."
      );
    } finally {
      setCancelingId(null);
    }
  };

  const renderHeader = () => {
    return (
      <div style={{ "background-color": "rgba(19, 59, 113, 0.8)" }}>
        <PageHeader searchOpen={null} topBgColor="#133B71"></PageHeader>
        <div className="mt-4 row p-3">
          <div className="reservations-top-row2 col-sm-2 mb-2">
            <input
              type="text"
              className="reservations-search-input form-control mb-2"
              placeholder="Enter reservation ID"
              onChange={(e) =>
                handleReservationSearch("reservationId", e.target.value)
              }
            />
          </div>
          <div className="reservations-top-row2-button col-sm-2 mb-2">
            <DatePickerDeparture />
          </div>
          <div className="reservations-top-row2-button col-sm-2 mb-2">
            <DatePickerArrival />
          </div>
          <div className="reservations-top-row2-button col-sm-2 ">
            <Button
              style={{ height: "60px", fontSize: "20px" }}
              icon={
                <img
                  src={searchLogo}
                  style={{ width: "22px", marginRight: "5px" }}
                  alt=""
                />
              }
              fullwidth={true}
              variant="green"
              text="Search"
              onClick={handlSearchClick}
            />
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      id: "reservationID",
      name: "Reservation ID",
      selector: (row) => row.reservationID,
      cell: (row) => row.reservationID,
      width: "1fr",
    },
    {
      id: "reservationDate",
      name: "Reservation Date",
      sortable: true,
      selector: (row) => row.bookedAt,
      cell: (row) => <div>{moment(row.bookedAt).format("YYYY-DD-mm")}</div>,
      width: "1fr",
    },
    {
      id: "Agency Name",
      name: "Agency Name",
      sortable: true,
      selector: (row) => row.agencyName,
      cell: (row) => (
        <div className="link18" onClick={() => {}}>
          {row.agencyName}
        </div>
      ),
      width: "1fr",
    },
    {
      id: "status",
      name: "Status",
      sortable: true,
      selector: (row) => row.guestBookingStatus,
      cell: (row) => row.guestBookingStatus,
      cellStyle: { display: "block", padding: "10px 0px" },
      width: "1fr",
    },
    {
      id: "totalPrice",
      name: "Total Price",
      sortable: true,
      selector: (row) => row.taxAmount,
      cell: (row) => <div>{row.taxAmount}</div>,
      width: "1fr",
    },
    {
      id: "clientName",
      name: "Client Name",
      sortable: true,
      selector: (row) => row.guestFirstName,
      cell: (row) => <div>{row.guestFirstName}</div>,
      width: "1fr",
    },
    {
      id: "arrivalDate",
      name: "Arrival Date",
      sortable: true,
      selector: (row) => row.startDate,
      cell: (row) => <div>{row.startDate}</div>,
      width: "1fr",
    },
    //  {
    //  id: 'destination',
    //  name: 'Destination',
    //  sortable: true,
    //  selector: row => row.destination,
    //  cell: row => <div>{row.destination}</div>,
    //  width: '1fr'
    // },
    {
      id: "nights",
      name: "# Nights",
      sortable: true,
      selector: (row) => row.nights,
      cell: (row) => <div>{row.nights}</div>,
      width: "1fr",
    },
    {
      id: "bookingTotal",
      name: "Booking Total",
      sortable: true,
      selector: (row) => row.total,
      cell: (row) => <div>{row.total}</div>,
      width: "1fr",
    },
  ];

  return (
    <>
      <div
        className="reserve-container"
        style={{ backgroundImage: `url(${pageBg})` }}
      >
        {renderHeader()}

        {reservations != null && reservations.length === 0 ? (
          <div
            className="reservations-results"
            style={{ backgroundColor: "#FFF" }}
          >
            <LoadingBox visible={isLoading} />
            {reservations && renderPaging()}
            {/* <div className="px-5">
                            {<Paging perPage={constants.PAGING_AGENCIES_SIZE} totalItems={100} currentPage={pageNumber} onChangePage={onChangePage} />}
                            <div className="table-responsive">
                                <Datatable bodyHeight="calc(100vh - 160px)" data={data} columns={columns} patchBgColor="#F5F5F2" />
                            </div>
                        </div> */}
            <div className="table-responsive px-3">
              <table class="table">
                <thead style={{ backgroundColor: "#f9f9f7" }}>
                  <tr>
                    {columns?.map((iteam, index) => {
                      return (
                        <>
                          <th
                            scope="col"
                            className="p-4 "
                            style={{ cursor: "pointer" }}
                          >
                            <h3>
                              {iteam.name} <BsChevronDown />
                            </h3>
                          </th>
                        </>
                      );
                    })}
                    <th scope="col" className="p-4 ">
                      <h3>Action</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((iteam, index) => {
                    return (
                      <>
                        <tr>
                          <th className="px-4 p-3 ">
                            <h4>
                              {iteam.reservationID !== null
                                ? iteam.reservationID
                                : "-"}
                            </h4>
                          </th>
                          <td className="px-4 p-3">
                            <h4>
                              {iteam.reservationDate != null
                                ? iteam.reservationDate
                                : "-"}
                            </h4>
                          </td>
                          <td className="px-4 p-3 text-primary text-decoration-underline">
                            <h4>
                              {iteam.agencyName !== null
                                ? iteam.agencyName
                                : "-"}
                            </h4>
                          </td>
                          <td className="px-4 p-3">
                            <h4>
                              {iteam.status !== null ? iteam.status : "-"}
                            </h4>
                          </td>
                          <td className="px-4 p-3">
                            <h4>{iteam.total !== null ? iteam.total : "-"}</h4>
                          </td>
                          <td className="px-4 p-3">
                            <h4>
                              {iteam.client_id !== null ? iteam.client_id : "-"}
                            </h4>
                          </td>
                          <td className="px-4 p-3">
                            <h4>
                              {iteam.startDate !== null ? iteam.startDate : "-"}
                            </h4>
                          </td>
                          <td className="px-4 p-3">
                            <h4>
                              {iteam.nights !== null ? iteam.nights : "-"}
                            </h4>
                          </td>
                          <td className="px-4 p-3">
                            <h4>{iteam.total !== null ? iteam.total : "-"}</h4>
                          </td>
                          <td className="px-4 p-3">
                            {isCancellable(iteam.status) ? (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                disabled={cancelingId === iteam.reservationID}
                                onClick={() => onCancelReservation(iteam)}
                              >
                                {cancelingId === iteam.reservationID
                                  ? "Cancelling…"
                                  : "Cancel"}
                              </button>
                            ) : (
                              <h4>-</h4>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className="reservations-results"
            style={{ backgroundColor: "#FFF" }}
          >
            No results
          </div>
        )}
      </div>
    </>
  );
};

export default Reservations;
