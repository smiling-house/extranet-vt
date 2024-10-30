import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import "./CustomTable.css";
import { baseURL } from "../../core";
import axios from "axios";
//nested data is ok, see accessorKeys in ColumnDef below

const Example = ({ row, token }) => {
  const [agnetsList, setAgentsList] = React.useState([]);

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
    //console.log("fetched Clients Log>>>>", data.clientLogs);
    setAgentsList(data.clientLogs);
  };

  React.useEffect(() => {
    // //console.log(row);
    getAllClientLogs();
  }, []);

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "Name", //access nested data with dot notation
        header: "Name",
      },
      {
        accessorKey: "email", //normal accessorKey
        header: "email",
      },
      {
        accessorKey: "phone",
        header: "phone",
      },
      {
        accessorKey: "approved",
        header: "approved",
      },
    ],
    []
  );

  return (
    <div className="w-100 custom-table">
      <MaterialReactTable
        columns={columns}
        data={data}
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
        // enableTableHead={false}
      />
    </div>
  );
};

export default Example;
