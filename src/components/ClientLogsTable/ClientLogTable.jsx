import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import "./ClientLogTable.css";
import Check from "../Icons/Check/Check";
import axios from "axios";
import { baseURL } from "../../core";

const ClientLogs = ({ row, token }) => {
  const [clientLogs, setClientLogs] = React.useState([]);

  const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
      token: `Bearer ${token}`,
    },
  });

  const getAllClientLogs = async () => {
    const { data } = await userRequest.get(`/client-log/getAllLogs`, {
      params: { client_id: row.original.client_id },
    });
    //console.log("fetched Clients >>>>", data.clientLogs);
    setClientLogs(data.clientLogs);
  };

  React.useEffect(() => {
    // //console.log(row);
    getAllClientLogs();
  }, []);

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "property_id", //access nested data with dot notation
        header: "Property ID",
      },
      {
        accessorKey: "Tag",
        header: "Saved Search",
      },
      {
        accessorKey: "destination", //normal accessorKey
        header: "Destination",
      },
      {
        accessorKey: "links",
        header: "Links",
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
            {row.original.links > 0 ? <Check /> : null}
          </div>
        ),
      },
      {
        accessorKey: "brochure",
        header: "Brochure",
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
            {row.original.brochure > 0 ? <Check /> : null}
          </div>
        ),
      },
      {
        accessorKey: "booked",
        header: "Booked",
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
            {row.original.booked > 0 ? <Check /> : null}
          </div>
        ),
      },
      {
        accessorKey: "dateAction",
        header: "Date",
      },
    ],
    []
  );

  return (
    <div className="w-100 custom-table">
      <MaterialReactTable
        columns={columns}
        data={clientLogs}
        enableFilters={false}
        enablePagination={false}
        enableFullScreenToggle={false}
        enableDensityToggle={false}
        enableHiding={false}
        enableBottomToolbar={false}
        enableTopToolbar={false}
        muiTableHeadProps={{
          sx: {
            "& tr": {
              backgroundColor: "#f2f9fc",
            },
          },
        }}
        muiTableBodyProps={{
          sx: {
            //stripe the rows, make odd rows a darker color
            "& tr:nth-of-type(odd)": {
              backgroundColor: "#f2f9fc",
            },
            "& tr:nth-of-type(even)": {
              backgroundColor: "#f2f9fc",
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            fontFamily: "Quicksand",
            borderBottom: "none",
          },
        }}
        // enableTableHead={false}
      />
    </div>
  );
};

export default ClientLogs;
