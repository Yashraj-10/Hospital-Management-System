import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FormDialogReset from './ResetPasswordPopup';

//no IE 11 support

const columns = [
  { 
    id: 'name', 
    label: 'Name', 
    minWidth: 170 
  },
  { 
    id: 'usrcode', 
    label: 'Type', 
    minWidth: 100 
  },
  {
    id: 'usrname',
    label: 'Username',
    minWidth: 170
  },
  {
    id: 'psswd',
    label: '',
  },
  {
    id: 'del',
    label: '',
  }
];

function createData(name, usrcode, usrname) {
  return { name, usrcode, usrname};
}

const rows = [
  createData('Nirbhay', 'DBA', 'jnv_45'),
  createData('Pranil', 'Dr', 'puchhi_18'),
  createData('Vikas', 'FD', 'basti_7'),
  createData('Nirbhay', 'DBA', 'jnv_45'),
  createData('Pranil', 'Dr', 'puchhi_18'),
  createData('Vikas', 'FD', 'basti_7'),
  createData('Nirbhay', 'DBA', 'jnv_45'),
  createData('Pranil', 'Dr', 'puchhi_18'),
  createData('Vikas', 'FD', 'basti_7'),
  createData('Nirbhay', 'DBA', 'jnv_45'),
  createData('Pranil', 'Dr', 'puchhi_18'),
  createData('Vikas', 'FD', 'basti_7'),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            column.id === 'psswd' ? <FormDialogReset /> :
                            column.id === 'del' ? <IconButton aria-label="delete"><DeleteIcon /></IconButton> :
                            column.format && typeof value === 'number'
                            ? column.format(value)
                            : value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}