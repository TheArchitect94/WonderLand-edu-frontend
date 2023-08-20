import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

const StudentResultTable = ({
  columns,
  rows,
  onDelete,
  rowsPerPage = 10,
  height = "450px",
  showActions = true,
}) => {
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // console.log("Data in StudentResultTable:", columns, rows);
  return (
    <div style={{ padding: "0 16px" }}> {/* Add spacing on the left and right */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              {showActions && onDelete && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === "subjects" ? (
                        <Table>
                          <TableBody>
                            {row.subjects.map((subject, subIndex) => (
                              <TableRow key={subIndex}>
                                <TableCell>{subject.subject_name}</TableCell>
                                <TableCell>{subject.marks}</TableCell>
                                <TableCell>{subject.total_marks}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                  {showActions && onDelete && (
                    <TableCell>
                      <Button
                        onClick={() => onDelete(row.id)}
                        variant="outlined"
                        color="error"
                      >
                        Delete Student
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > rowsPerPage && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
};

export default StudentResultTable;
