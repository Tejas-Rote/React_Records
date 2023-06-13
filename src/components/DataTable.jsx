import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const columns = [
  {
    id: "firstName",
    label: "FirstName",
    minWidth: 100,
    align: "left",
  },
  {
    id: "lastName",
    label: "LastName",
    minWidth: 100,
    align: "left",
  },
  {
    id: "age",
    label: "Age",
    minWidth: 50,
    align: "left",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 50,
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 120,
    align: "left",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
    align: "left",
  },

  {
    id: "username",
    label: "Username",
    minWidth: 120,
    align: "left",
  },

  {
    id: "birthDate",
    label: "DOB",
    minWidth: 120,
    align: "left",
  },
  {
    id: "height",
    label: "Height",
    minWidth: 90,
    align: "left",
  },

  {
    id: "weight",
    label: "Weight",
    minWidth: 90,
    align: "left",
  },

  {
    id: "address",
    label: "Address",
    minWidth: 120,
    align: "left",
  },

  {
    id: "bank",
    label: "Bank",
    minWidth: 120,
    align: "left",
  },

  {
    id: "company",
    label: "Company Name",
    minWidth: 120,
    align: "left",
  },
];

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        const usersArray = Object.values(response.data);
        setUsers(usersArray[0]);
        console.log(usersArray[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action///.hover,
      backgroundColor: "#bdc3c7",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "&:nth-of-type(odd):hover": {
      backgroundColor: "#3b8d99",
    },
    "&:nth-of-type(even):hover": {
      backgroundColor: "#3b8d99",
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500, maxWidth:1700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.firstName}
                  >
                    {columns.map((column) => {
                      const col = column.id;
                      var x = "";
                      const addressString = `Address: ${row.address.address} City: ${row.address.city},  State: ${row.address.state}, ${row.address.postalCode}, Latitude: ${row.address.coordinates.lat}, Longitude: ${row.address.coordinates.lng}`;

                      {
                        col === "address"
                          ? (x = addressString)
                          : col === "bank"
                          ? (x = row.bank.cardExpire)
                          : col === "company"
                          ? (x = row.company.name)
                          : (x = row[col]);
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(x)
                            : x}
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
