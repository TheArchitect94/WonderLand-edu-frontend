import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  position: "sticky",
  top: 0,
  background: "#fff",
  zIndex: theme.zIndex.appBar + 1,
}));

const ImagePreview = ({ imageUrl }) => {
  return <img width="80vw" height="auto" src={imageUrl} alt="Image Preview" />;
};

const TableComponent = ({
  rows,
  columns,
  onEdit,
  onDelete,
  showActions = true,
  fullHeight = false,
  defaultRowsPerPage = 10,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!rows || rows.length === 0 || !columns || columns.length === 0) {
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 150 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>No entries</StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    );
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer
      component={Paper}
      sx={{
        minHeight: fullHeight ? "75%" : 250, // Set a minimum height
        maxHeight: fullHeight ? "75%" : 450,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
            ))}
            {showActions && <StyledTableCell>Actions</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.id === "image_url" ? (
                    <ImagePreview imageUrl={row[column.id]} />
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <Button onClick={() => onDelete(row.id)} variant="outlined" color="error"  startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={columns.length + (showActions ? 1 : 0)} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default TableComponent;
