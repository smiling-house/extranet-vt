import React, { useEffect, useState } from "react";
import Icon from "react-web-vector-icons";
import Button from "../../components/Buttons/Button/Button";
import pageBg from "../../assets/SigninPic.jpeg";

import editIcon from "../../assets/icons/admin-edit-icon.png";
import editAdminIcon from "../../assets/icons/admin/menu/edit.svg";
import addAdminIcon from "../../assets/icons/admin/menu/add.svg";
import deleteAdminIcon from "../../assets/icons/admin/menu/delete.svg";
import PageHeader from "../../components/PageHeader";
import Datatable from "../../components/Datatable";
// import DataTable from 'react-data-table-component';

import Popup from "../../components/Popup";
import EditAgency from "./EditAgency";

import { data } from "./makeData.js";
import "./Admin.scss";
import ApproveAgent from "./ApproveAgent";
import DisApproveAgent from "./DisApproveAgent";
import DeleteAgency from "./DeleteAgency";
import axios from "axios";
import { baseURL } from "../../core/index.js";
import Paging from "../../components/Paging";
import constants from "../../Util/constants";
import countryList from "../../Util/data/countries.json";
import { BorderColor, RawOff } from "@mui/icons-material";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import LoadingBox from "../../components/LoadingBox/index.js";
import { getStorageValue } from "../../Util/general.js";

const NEW_AGENCY = {
  id: "-1",
  agencyName: "",
  agentName: "",
  address: "",
  email: "",
  country: "",
  city: "",
  postalCode: "",
  notes: "",
  phone: "",
};

const Admin = ({ props, token }) => {
  const divRefs = React.useRef([]);

  const [searchInputes, setsearchInputes] = useState({
    accountId: '',
    pmName: '',
  });

  const [editClickedId, seteditClickedId] = useState("");
  const [editAgencyId, seteditAgencyId] = useState("");
  const [selectedRowToEdit, setSelectedRowToEdit] = useState(null);
  const [selectedAgencyToEdit, setSelectedAgencyToEdit] = useState(null);
  const [selectedAgencyToDelete, setSelectedAgencyToDelete] = useState(null);
  const [agencyToApprove, setAgencyToApprove] = useState(null);
  const [agencyToDisApprove, setAgencyToDisApprove] = useState(null);
  const [totalAgencies, setTotalAgencies] = useState(0);
  const [agencies, setAgencies] = useState([]);
  const [filterAgencies, setFilterAgencies] = useState();
  const [searchAgencies, setSearchAgencies] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedAgencies, setSortedAgencies] = useState(agencies);
  const [loading, setLoading] = useState(false);
  const partnerLogin=getStorageValue('partnerLogin')
  const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
      token: `Bearer ${token}`,
    },
  });
  const getAllAgencies = async () => {
    const agenciesResponse = await userRequest.get(
      `travel-agency/get-travel-agencies`,
      {
        params: {
          limit: constants.PAGING_AGENCIES_SIZE,
          skip: agenciesPagingFrom - 1,
        },
      }
    );
    localStorage.setItem("agencyCount", agenciesResponse.data?.totalAgencies);
    setTotalAgencies(agenciesResponse.data?.totalAgencies ?? 0);
    setAgencies(agenciesResponse.data.agencies);
  };
  const getSearchAgencies = async () => {
    const agenciesResponse = await userRequest.get(
      `travel-agency/get-travel-agencies`,
      {
        params: {
          limit: constants.PAGING_AGENCIES_SIZE,
          skip: agenciesPagingFrom - 1,
          agencyName: searchInputes.agencyName,
          agency_id: searchInputes.agencyId,
        },
      }
    );
    localStorage.setItem("agencyCount", agenciesResponse.data?.totalAgencies);
    setTotalAgencies(agenciesResponse.data?.totalAgencies ?? 0);
    setAgencies(agenciesResponse.data.agencies);
  };

  const onDeleteAgency = async (agencyId) => {
    try {
      await userRequest.delete(
        `travel-agency/delete-travel-agencies?agency_id=${agencyId}`
      );
      console.log(`Agency with ID ${agencyId} has been deleted.`);
      getAllAgencies();
    } catch (error) {
      console.error("Error deleting agency:", error);
    }
    setSelectedAgencyToDelete(selectedRowToEdit);
    clearEditMenu();
  };

  const handleSorting = async (orderBy) => {
    const authToken = localStorage.getItem("jToken");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await axios.get(
        `${baseURL}/travel-agency/get-travel-agencies/?sortBy=agencyDetails.agency_id:${orderBy}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (partnerLogin) {
      getSearchAgencies()
    } else {
      getAllAgencies()
    }
  }, []);

  useEffect(() => {
    const fetchSortedData = async () => {
      try {
        setLoading(true);
        const { agencies, totalAgencies } = await handleSorting(sortDirection);
        setSortedAgencies(agencies);
        setTotalAgencies(totalAgencies)
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSortedData();
  }, [sortDirection]);

  const doSearch = (pageNumber) => {
    //console.log("skipping : ", pageNumber * constants.PAGING_AGENCIES_SIZE);
    getAllAgencies();
    //setShowSelection(false);
    //dispatch(agencyActions.loadagencies(pageNumber));
  };

  let agenciesPagingFrom = 1 + pageNumber * constants.PAGING_AGENCIES_SIZE;
  let agenciesPagingTo = (pageNumber + 1) * constants.PAGING_AGENCIES_SIZE;

  const onChangePage = (pageNumber) => {
    console.log("page=", pageNumber);
    setPageNumber(pageNumber);
    agenciesPagingFrom = 1 + pageNumber * constants.PAGING_AGENCIES_SIZE;
    agenciesPagingTo = (pageNumber + 1) * constants.PAGING_AGENCIES_SIZE;
    doSearch(pageNumber);
  };

  const menuStyle = () => {
    const pos = divRefs.current[selectedRowToEdit.id].getBoundingClientRect();
    const top = pos.top > window.innerHeight ? window.innerHeight : pos.top;
    return { top: `${top}px`, left: `${pos.left - 170}px` };
  };

  const clearEditMenu = () => {
    setSelectedRowToEdit(null);
  };

  const onShowEditMenu = (row) => {
    setSelectedRowToEdit(row);
    console.log("Row to edit=", row);
  };

  const onEditAgency = (id, agencyidd) => {
    seteditClickedId(id);
    seteditAgencyId(agencyidd);
    setSelectedAgencyToEdit(id);
    console.log(selectedRowToEdit);
    clearEditMenu();
  };

  const onAddAgency = () => {
    setSelectedAgencyToEdit(NEW_AGENCY);
    clearEditMenu();
  };

  const onAgencyToApprove = (row) => {
    setAgencyToApprove(row);
    console.log("Row to approve=", row);
    console.log("country=", row.country);
    const ccIndex = countryList.findIndex((i) => i.name === row.country);
    const cc = ccIndex ? countryList[ccIndex].code : "";
    console.log("countryCode=", cc);
  };
  function getCountryCode(row) {
    const ccIndex = countryList.findIndex((i) => i.name === row.country);
    const cc = ccIndex ? countryList[ccIndex].code : "";
    return cc;
  }

  const columns = [
    {
      id: "id",
      name: "ID",
      selector: (row) => row.agency_id,
      cell: (row) =>
        row.agency_id ? String(row.agency_id).padStart(4, "0") : "---",
      width: "80px",
    },
    {
      id: "agencyName",
      name: "Agency Name",
      selector: (row) => row.agencyName,
      cell: (row) => (
        <div className="link18" onClick={() => setSelectedAgencyToEdit(row)}>
          {row.agencyName}
        </div>
      ),
      width: "350px",
    },
    {
      id: "firstName",
      name: "Manager",
      sortable: true,
      selector: (row) => row.firstName,
      cell: (row) => (
        <div className="link18" onClick={() => setSelectedAgencyToEdit(row)}>
          {row.firstName + " " + row.lastName}
        </div>
      ),
      width: "250px",
    },
    {
      id: "subAgent",
      name: "Sub Agent",
      sortable: true,
      //selector: row => row.subAgent,
      cell: (row) => (
        <div className="link18" onClick={() => {}}>
          {row.subAgent}
        </div>
      ),
      width: "180px",
    },
    {
      id: "email",
      name: "Email Address",
      sortable: true,
      selector: (row) => row.email,
      cell: (row) => row.email,
      cellStyle: { display: "block", padding: "10px 0px" },
      width: "250px",
    },
    {
      id: "phone",
      name: "Phone No.",
      sortable: true,
      selector: (row) => row.phone,
      cell: (row) => <div>{row.phone}</div>,
      width: "250px",
    },
    {
      id: "country",
      name: "Country",
      sortable: true,
      selector: (row) => row.country,
      cell: (row) => (
        <div>
          {row.country ? row.country : ""}
          {row.countryCode && (
            <img
              width="50px"
              src={
                "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                row.countryCode +
                ".svg"
              }
            />
          )}
        </div>
      ),
      width: "180px",
    },
    {
      id: "status",
      name: "Status",
      width: "180px",
      sortable: true,
      //selector: row => row.status,
      cell: (row) =>
        row.status == "pending" ? (
          <div className="link18" onClick={() => onAgencyToApprove(row)}>
            {row.status}
          </div>
        ) : (
          <div
            className="link18-no-line"
            onClick={() => setAgencyToDisApprove(row)}
          >
            {row.status}
          </div>
        ),
    },
    {
      id: "approvedAt",
      name: "Approved At",

      sortable: true,
      //selector: row => row.approvedAt,
      cell: (row) =>
        row.status == "pending" ? (
          ""
        ) : (
          <div className="link18-date">{row.approvedAt}</div>
        ),
      width: "150px",
    },
    {
      id: "firstSignIn",
      name: "First Sign In",
      sortable: true,
      //selector: row => row.firstSignIn,
      cell: (row) =>
        row.status == "pending" ? (
          ""
        ) : (
          <div className="link18-date">{row.firstSignIn}</div>
        ),
      width: "150px",
    },
    {
      id: "lastSignIn",
      name: "Last Sign In",
      sortable: true,
      //selector: row => row.lastSignIn,
      cell: (row) =>
        row.status == "pending" ? (
          ""
        ) : (
          <div className="link18-date">{row.lastSignIn}</div>
        ),
      width: "150px",
    },
    {
      id: "edit",
      name: "Edit",
      header: (column, index) => (
        <div
          key={index}
          style={{
            color: "#1B9C5D",
            backgroundColor: "#F5F5F2",
            fontSize: "22px",
            fontWeight: 500,
          }}
        >
          Edit
        </div>
      ),
      headerStyle: { paddingLeft: "50px", backgroundColor: "#F5F5F2" },
      sortable: true,
      //selector: row => row.offers,
      cell: (row) => (
        <div
          onClick={() => onShowEditMenu(row)}
          className="agencies-edit-icon"
          key={row.id}
          ref={(element) => (divRefs.current[row.id] = element)}
        >
          <img src={editIcon} alt="" />
        </div>
      ),
      width: "100px",
    },
  ];

  // selectedRowToEdit && console.log("pos: ", selectedRowToEdit.id, divRefs.current[selectedRowToEdit.id].getBoundingClientRect().top);
  // paging numbering:

  const handleSearchFuntionality = (value, name) => {
    console.log(name, value, "search Q");
    setsearchInputes({ ...searchInputes, [name]: value });
  };
  const handlSearchButtonAdmin = () => {
    getSearchAgencies();
  };
  function handekanda(status) {
    if (status !== "pending") {
      setAgencyToDisApprove("null");
    }
  }

  const handleSort = (column) => {
    if (sortColumn == column) {
      const orderBy = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(orderBy);
      return;
    } else {
      setSortColumn(column);
      setSortDirection("asc");
      return;
    }
  };

  return (
    <div className="agencies-container">
      <PageHeader
        handleSearchFuntionality={handleSearchFuntionality}
        searchInputes={searchInputes}
        handlSearchButtonAdmin={handlSearchButtonAdmin}
        addUser={onAddAgency}
        searchOpen={null}
        topBgColor="#133B71"
      />
      {selectedRowToEdit && (
        <>
          <div
            className="agencies-floating-edit-menu-floater"
            onClick={clearEditMenu}
          />
          <div className="agencies-floating-edit-menu" style={menuStyle()}>
            {/* <div className="agencies-floating-edit-menu-row" onClick={onEditAgency}><img src={editAdminIcon} alt="" />&nbsp;&nbsp;Edit Agency</div> */}
            <div
              className="agencies-floating-edit-menu-row"
              onClick={onDeleteAgency}
            >
              <img src={deleteAdminIcon} alt="" />
              &nbsp;&nbsp;Delete Agency
            </div>
            <div
              className="agencies-floating-edit-menu-row"
              onClick={onAddAgency}
            >
              <img src={addAdminIcon} alt="" />
              &nbsp;&nbsp;Add Agency
            </div>
            <div
              className="agencies-floating-edit-menu-row"
              onClick={clearEditMenu}
            >
              &nbsp;&nbsp;close X
            </div>
          </div>
        </>
      )}
      {agencyToApprove && (
        <Popup width={820} onClose={() => setAgencyToApprove(null)}>
          <ApproveAgent
            agency={agencyToApprove}
            onClose={() => setAgencyToApprove(null)}
          />
        </Popup>
      )}
      {agencyToDisApprove && (
        <Popup width={820} onClose={() => setAgencyToDisApprove(null)}>
          <DisApproveAgent
            agency={agencyToDisApprove}
            onClose={() => setAgencyToDisApprove(null)}
          />
        </Popup>
      )}
      {selectedAgencyToDelete && (
        <Popup width={820} onClose={() => setSelectedAgencyToDelete(null)}>
          <DeleteAgency
            agency={selectedAgencyToDelete}
            onClose={() => setSelectedAgencyToDelete(null)}
          />
        </Popup>
      )}
      {selectedAgencyToEdit && (
        <div className="popup-wrapper">
          <div className="popup-container p-2" style={{ width: "730px" }}>
            <EditAgency
              editClickedId={editClickedId}
              editAgencyId={editAgencyId}
              agency={selectedAgencyToEdit}
              agencies={agencies}
              onClose={() => setSelectedAgencyToEdit(null)}
            />
          </div>
        </div>
      )}
      <div className="agencies-main p-4">
        <div className="agencies-title">
        <h3>Admin Dashboard</h3>
          
        </div>
        <div className="agencies-main-subtitle">
            Displaying agencies {agenciesPagingFrom}-{agenciesPagingTo} of{" "}
            {localStorage.getItem("agencyCount")
              ? localStorage.getItem("agencyCount")
              : "?"}
          </div>
        {
          <Paging
            perPage={constants.PAGING_AGENCIES_SIZE}
            totalItems={totalAgencies}
            currentPage={pageNumber}
            onChangePage={onChangePage}
          />
        }
        {/*
				<div style={{ padding: '0 20px' }}>
					<Datatable
						topWidth='2500px'
						leftPad='650px'
						data={agencies}
						columns={columns}
						patchBgColor="#F5F5F2" />
				</div> */}
        <div className="table-responsive">
          <table class="table">
            <thead style={{ backgroundColor: "#f9f9f7" }}>
              <tr>
                {columns?.map((item, index) => {
                  return (
                    <>
                      <th
                        scope="col"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort(item.name)}
                      >
                        <h5>
                          {item.name}
                          {sortColumn == item.name ? (
                            sortDirection == "asc" ? (
                              <BsChevronDown />
                            ) : (
                              <BsChevronUp />
                            )
                          ) : (
                            <BsChevronDown />
                          )}
                        </h5>
                      </th>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <div>
                  <LoadingBox visible={loading} />
                </div>
              )}
              {!loading &&
                sortedAgencies?.map((item, index) => {
                  {
                    if (item.agencyDetails.length > 0) {
                      return (
                        <>
                          <tr>
                            <td className="px-4 p-3 ">
                              <h6>{item._id || "-"}</h6>
                            </td>
                            <td className="px-4 p-3  text-primary text-decoration-underline cst-cursor">
                              <h6
                                onClick={() =>
                                  onEditAgency(
                                    item?._id || 0,
                                    item?.agencyDetails[0]?.agency_id || 0
                                  )
                                }
                              >
                                {item.agencyDetails[0].agencyName || "-"}
                              </h6>
                            </td>
                            <td className="px-4 p-3 text-primary text-decoration-underline cst-cursor">
                              <h6
                                onClick={() =>
                                  onEditAgency(
                                    item?._id || 0,
                                    item?.agencyDetails[0]?.agency_id || 0
                                  )
                                }
                              >
                                {item.agencyDetails[0].firstName || "-"}
                              </h6>
                            </td>
                            <td className="px-4 p-3">
                              <h6>{item.count || "-"}</h6>
                            </td>
                            <td className="px-4 p-3">
                              <h6>{item.agencyDetails[0].email || "-"}</h6>
                            </td>
                            <td className="px-4 p-3">
                              <h6>{item.agencyDetails[0].phone || "-"}</h6>
                            </td>
                            <td className="px-4 p-3">
                              <h6>
                                {item.agencyDetails[0].country !== null ? (
                                  <img
                                    style={{
                                      borderStyle: "solid",
                                      borderColor: "grey",
                                      borderWidth: "1px",
                                    }}
                                    width="50px"
                                    src={
                                      "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                                      item?.agencyDetails[0].countryCode
                                        ?.slice(0, 2)
                                        .toUpperCase() +
                                      ".svg"
                                    }
                                  />
                                ) : (
                                  "-"
                                )}
                                {item.agencyDetails[0].countryCode}
                              </h6>
                            </td>
                            <td className="px-4 p-3  text-primary text-decoration-underline cst-cursor">
                              <h6 onClick={() => onAgencyToApprove(item)}>
                                {item.agencyDetails[0].status || "-"}
                              </h6>
                            </td>
                            <td className="px-4 p-3">
                              <h6>{item.agencyDetails[0].createdAt || "-"}</h6>
                            </td>
                            <td className="px-4 p-3">
                              <h6>
                                {item.agencyDetails[0].firstSignIn || "-"}
                              </h6>
                            </td>
                            <td className="px-4 p-3">
                              <h6>{item.agencyDetails[0].lastSignIn || "-"}</h6>
                            </td>
                            <td className="px-4 p-3">
                              <div class="dropdown">
                                <img
                                  src={editIcon}
                                  alt="editIcon"
                                  className="dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  style={{ cursor: "pointer" }}
                                />
                                <ul class="dropdown-menu">
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      onClick={onAddAgency}
                                    >
                                      <img src={addAdminIcon} /> Add Agency
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        onEditAgency(
                                          item?._id,
                                          item?.agencyDetails[0]?.agency_id
                                        )
                                      }
                                    >
                                      <img src={editAdminIcon} /> Edit Agency
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      href="#"
                                      onClick={() => onDeleteAgency(item?._id)}
                                    >
                                      <img src={deleteAdminIcon} /> Delete
                                      Agency
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    }
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
