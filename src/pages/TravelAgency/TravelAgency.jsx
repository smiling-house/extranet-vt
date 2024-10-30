import React, { useCallback, useMemo, useState, useEffect } from "react";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AgentTable from "../../components/AgentsTable/AgentsTable";
import { drawerWidth } from "../index.jsx";
import "./TravelAgency.css";
import axios from "axios";
import { baseURL } from "../../core/index.js";

const TravelAgency = ({ token }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});
  // state for TravelAgency
  const [customers, setCustomers] = useState([]);
  // //console.log("TravelAgency >>>>", TravelAgency);

  //modal state
  const [modalData, setModalData] = useState({
    title: "Add new Travel Agency",
  });

  const handleUpdateRow = (row) => {
    //console.log("row >>>>", row);
    setCreateModalOpen(true);
    setModalData({
      title: "Edit Travel Agency",
      row: row,
    });
  };

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //   const handleDeleteRow = useCallback(
  //     (row) => {
  //       //send api delete request here, then refetch or update local table data for re-render
  //       tableData.splice(row.index, 1);
  //       setTableData([...tableData]);
  //     },
  //     [tableData]
  //   );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "phone"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
        Cell: ({ row }) => {
          let fullName = row.original.firstName + " " + row.original.lastName;
          // //console.log("fullName >>>", fullName);
          return (
            <div
              className="language-js"
              enableCopyButton={false}
              style={{
                backgroundColor: "transparent",
                fontSize: "0.9rem",
                margin: 0,
                padding: 0,
                minHeight: "unset",
              }}
            >
              {fullName}
            </div>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email Address",
        enableClickToCopy: true,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "phone",
        header: "Phone No",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "phone",
        }),
        Cell: ({ row }) => (
          <div
            className="language-js"
            enableCopyButton={false}
            style={{
              backgroundColor: "transparent",
              fontSize: "0.9rem",
              margin: 0,
              padding: 0,
              minHeight: "unset",
            }}
          >
            {"+" + row.original.phone}
          </div>
        ),
      },
      // {
      //   accessorKey: "state",
      //   header: "State",
      //   muiTableBodyCellEditTextFieldProps: {
      //     select: true, //change to select for a dropdown
      //     children: states.map((state) => (
      //       <MenuItem key={state} value={state}>
      //         {state}
      //       </MenuItem>
      //     )),
      //   },
      // },
    ],
    [getCommonEditTextFieldProps]
  );

  const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
      token: `Bearer ${token}`,
    },
  });

  const getAllCustomers = async () => {
    const fetchCustomers = await userRequest.get(`/travel-agency/get-travel-agencies`);
    //console.log("fetched TravelAgency >>>>", fetchCustomers.data.agencies);
    setCustomers(fetchCustomers.data.agencies);
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 140,
          left: `${drawerWidth + 20}`,
        }}
      >
        <div className="d-flex align-items-center ps-4 mb-3">
          <div className="form d-flex align-items-center flex-wrap">
            <form className=" row d-flex align-items-center pe-3 border-right-One">
              <div className="col-auto m-0 px-2">
                <input
                  type="text"
                  className="form-control border-radius-0 py-2"
                  id="inputName2"
                  placeholder="Enter Travel Agency Name/email"
                />
              </div>
              <div className="col-auto m-0 px-2">
                <button
                  type="submit"
                  className="btn btn-success border-radius-0"
                  style={{ backgroundColor: "#39EA1E" }}
                >
                  Search
                </button>
              </div>
            </form>
            <div className="button ps-3">
              <div className="">
                <button
                  color="transparent"
                  variant="transparent"
                  className="px-2 text-white d-flex align-items-center bg-transparent border-none"
                  onClick={() => setCreateModalOpen(true)}
                >
                  <span>
                    <AddCircleIcon />
                  </span>
                  <span className="px-1">Add New Travel Agency</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3 box-shadow-remover r-m-t">
        <MaterialReactTable
          columns={columns}
          // data={tableData}
          data={customers}
          editingMode="modal" //default
          enableFilters={false}
          enablePagination={false}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          enableHiding={false}
          positionExpandColumn="last"
          positionActionsColumn="last"
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Tooltip arrow placement="right" title="Edit">
                {/* <IconButton onClick={() => table.setEditingRow(row)}> */}
                <IconButton onClick={() => handleUpdateRow(row)}>
                  {/* <Edit /> */}
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderDetailPanel={({ row }) => <AgentTable row={row} token={token}/>}
          // renderDetailPanel={({ row }) => {
          //   icon: <ExpandCircleDownOutlinedIcon />,
          //   return(
          //     <CustomTable row={row} />
          //   )
          // }}
          //   detailPanel={[
          //     (rowData) => ({
          //         disabled: isEmpty(rowData.notes),  // hides hover state
          //         icon: isEmpty(rowData.notes) ? ' ' : ChatBubbleOutline,  // single space used here, empty string defaults to chevron
          //         openIcon: isEmpty(rowData.notes) ? ' ' : ChatBubble, // single space
          //         ...
          //     }),
          // ]}
          muiTableBodyProps={{
            sx: {
              boxShadow: "none",
            },
          }}
          muiTableHeadCellProps={{
            //easier way to create media queries, no useMediaQuery hook needed.
            sx: {
              fontSize: {
                xs: "10px",
                sm: "11px",
                md: "12px",
                lg: "13px",
                xl: "14px",
              },
              fontFamily: "Quicksand",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              fontFamily: "Quicksand",
              borderBottom: "none",
            },
          }}
        />
      </div>

      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        modalData={modalData}
      />
    </div>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  modalData,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  //console.log("date from modal >>>>", modalData);

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        textAlign="center"
        className="font-color"
        style={{ background: "#F2F9FC" }}
      >
        {modalData.title}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "500px" },
              gap: "1.5rem",
            }}
          >
            <div className="row g-3 pt-3">
              <div className="col-md-6 px-4">
                <div className="row mb-2">
                  <label htmlFor="inputText4" className="form-label mb-1 ps-0">
                    Travel Agency Name*
                  </label>
                  <input
                    type="name"
                    className="form-control rounded-0 py-2"
                    id="inputText4"
                    placeholder="Smiling House"
                  />
                </div>
                <div className="row mb-2">
                  <label htmlFor="inputText14" className="form-label mb-1 ps-0">
                    Travel Agency Email Address*
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-0 py-2"
                    id="inputText14"
                    placeholder="Ttravel@Smilinghouse.ch"
                  />
                </div>
                <div className="row mb-2">
                  <label
                    htmlFor="inputAddress"
                    className="form-label mb-1 ps-0"
                  >
                    Travel Agency Phone*
                  </label>
                  <input
                    type="phone"
                    className="form-control rounded-0 py-2"
                    id="inputAddress"
                    placeholder="+41-79-489-7021"
                    maxLength={11}
                  />
                </div>
              </div>
              <div className="col-md-6 px-4">
                <div className="row mb-2">
                  <label
                    htmlFor="inputAddress"
                    className="form-label mb-1 ps-0"
                  >
                    Nick Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0 py-2"
                    id="inputAddress"
                    placeholder="Smiling"
                  />
                </div>
                <div className="row mb-2">
                  <label
                    for="exampleFormControlTextarea1"
                    class="form-label mb-1 ps-0"
                  >
                    Notes
                  </label>
                  <textarea
                    class="form-control rounded-0 py-2"
                    id="exampleFormControlTextarea1"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <button
          type="submit"
          className="btn btn-success border-radius-0 w-25 py-2"
          style={{ backgroundColor: "#165093" }}
          onClick={handleSubmit}
        >
          Save
        </button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default TravelAgency;
