import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import "./AgentTable.css";
import Check from "../Icons/Check/Check";
import axios from "axios";
import { baseURL } from "../../core";

 
const AgentTable = ({ row, token }) => {
  const [agents, setAgents] = React.useState([]);

  const userRequest = axios.create({
    baseURL: baseURL,
    headers: {
      token: `Bearer ${token}`,
    },
  });

  const getAllAgents = async () => {
    const { data } = await userRequest.get(`/agent/get-agents`, {
      params: { agency_id: row.original.agency_id },
    });
    //console.log("fetched Clients >>>>", data.agents);
    setAgents(data.agents);
  };

  React.useEffect(() => {
    // //console.log(row);
    getAllAgents();
  }, []);

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: "Agent Name",
        size: 140,
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
      },
      {
        accessorKey: "phone", //normal accessorKey
        header: "Phone No.",
      },
      {
        accessorKey: "country", //normal accessorKey
        header: "Country",
      },
      {
        accessorKey: "organization", //normal accessorKey
        header: "Organization",
      },
    ],
    []
  );

  return (
    <div className="w-100 custom-table">
      <MaterialReactTable
        columns={columns}
        data={agents}
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

export default AgentTable;
