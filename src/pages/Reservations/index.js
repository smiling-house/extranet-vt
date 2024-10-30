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
  const handlSearchClick = () => {
    AuthService.GetReservation(seachInpputes)
      .then((response) => {
        setData(response.reservations);
      })
      .catch((e) => {
        console.log(e);
      });
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
